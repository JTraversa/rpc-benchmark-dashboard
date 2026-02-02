import { useState, useCallback, useRef } from 'react';
import { CHAINS } from '../config/chains';
import PROVIDERS from '../config/providers';
import { benchmarkProvider } from '../services/benchmark';

const STORAGE_KEY = 'rpc_benchmark_results';

function loadResults() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveResults(results) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function useBenchmark() {
  const [results, setResults] = useState(loadResults);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, label: '' });
  const abortRef = useRef(false);

  const runChain = useCallback(async (chainId) => {
    const chain = CHAINS.find((c) => c.id === chainId);
    const providers = PROVIDERS[chainId] || [];
    if (!chain || providers.length === 0) return;

    setRunning(true);
    abortRef.current = false;
    setProgress({ current: 0, total: providers.length, label: chain.name });

    const chainResults = { ...(results[chainId] || {}) };

    for (let i = 0; i < providers.length; i++) {
      if (abortRef.current) break;

      const provider = providers[i];
      setProgress({ current: i, total: providers.length, label: `${chain.name} - ${provider.name}` });

      const result = await benchmarkProvider(provider.url, chain, (step) => {
        setProgress((p) => ({ ...p, label: `${chain.name} - ${provider.name}: ${step}` }));
      });

      chainResults[provider.name] = result;

      setResults((prev) => {
        const next = { ...prev, [chainId]: { ...chainResults } };
        saveResults(next);
        return next;
      });
    }

    setProgress({ current: providers.length, total: providers.length, label: 'Done' });
    setRunning(false);
  }, [results]);

  const runAll = useCallback(async () => {
    setRunning(true);
    abortRef.current = false;

    const allChainIds = CHAINS.map((c) => c.id);
    let totalProviders = 0;
    for (const cid of allChainIds) {
      totalProviders += (PROVIDERS[cid] || []).length;
    }

    let completed = 0;
    const allResults = { ...results };

    for (const chainId of allChainIds) {
      if (abortRef.current) break;

      const chain = CHAINS.find((c) => c.id === chainId);
      const providers = PROVIDERS[chainId] || [];
      const chainResults = { ...(allResults[chainId] || {}) };

      for (const provider of providers) {
        if (abortRef.current) break;

        setProgress({
          current: completed,
          total: totalProviders,
          label: `${chain.name} - ${provider.name}`,
        });

        const result = await benchmarkProvider(provider.url, chain);
        chainResults[provider.name] = result;
        completed++;

        allResults[chainId] = { ...chainResults };
        setResults({ ...allResults });
        saveResults(allResults);
      }
    }

    setProgress({ current: totalProviders, total: totalProviders, label: 'Done' });
    setRunning(false);
  }, [results]);

  const stop = useCallback(() => {
    abortRef.current = true;
  }, []);

  const clearResults = useCallback(() => {
    setResults({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { results, running, progress, runChain, runAll, stop, clearResults };
}
