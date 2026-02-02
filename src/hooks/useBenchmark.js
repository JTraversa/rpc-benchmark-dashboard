import { useState, useCallback, useRef } from 'react';
import { CHAINS } from '../config/chains';
import PROVIDERS from '../config/providers';
import { benchmarkProvider, resolveUrl } from '../services/benchmark';

const STORAGE_KEY = 'rpc_benchmark_results';
const API_KEYS_KEY = 'rpc_benchmark_api_keys';

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

export function loadApiKeys() {
  try {
    const stored = localStorage.getItem(API_KEYS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveApiKeys(keys) {
  localStorage.setItem(API_KEYS_KEY, JSON.stringify(keys));
}

export function useBenchmark() {
  const [results, setResults] = useState(loadResults);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, label: '' });
  const abortRef = useRef(false);

  const runChain = useCallback(async (chainId, apiKeys = {}) => {
    const chain = CHAINS.find((c) => c.id === chainId);
    const providers = PROVIDERS[chainId] || [];
    if (!chain || providers.length === 0) return;

    setRunning(true);
    abortRef.current = false;

    // Count testable providers
    const testable = providers.filter((p) => resolveUrl(p, apiKeys) !== null);
    setProgress({ current: 0, total: testable.length, label: chain.name });

    const chainResults = { ...(results[chainId] || {}) };
    let completed = 0;

    for (let i = 0; i < providers.length; i++) {
      if (abortRef.current) break;

      const provider = providers[i];
      const url = resolveUrl(provider, apiKeys);

      // Skip providers without configured API keys
      if (!url) {
        chainResults[provider.name] = {
          status: 'key_missing',
          latencyMs: null,
          maxRange: null,
          error: 'API key not configured',
          testedAt: null,
        };
        setResults((prev) => {
          const next = { ...prev, [chainId]: { ...chainResults } };
          saveResults(next);
          return next;
        });
        continue;
      }

      setProgress({ current: completed, total: testable.length, label: `${chain.name} - ${provider.name}` });

      const result = await benchmarkProvider(url, chain, (step) => {
        setProgress((p) => ({ ...p, label: `${chain.name} - ${provider.name}: ${step}` }));
      });

      chainResults[provider.name] = result;
      completed++;

      setResults((prev) => {
        const next = { ...prev, [chainId]: { ...chainResults } };
        saveResults(next);
        return next;
      });
    }

    setProgress({ current: testable.length, total: testable.length, label: 'Done' });
    setRunning(false);
  }, [results]);

  const runAll = useCallback(async (apiKeys = {}) => {
    setRunning(true);
    abortRef.current = false;

    const allChainIds = CHAINS.map((c) => c.id);
    let totalTestable = 0;
    for (const cid of allChainIds) {
      const providers = PROVIDERS[cid] || [];
      totalTestable += providers.filter((p) => resolveUrl(p, apiKeys) !== null).length;
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

        const url = resolveUrl(provider, apiKeys);

        if (!url) {
          chainResults[provider.name] = {
            status: 'key_missing',
            latencyMs: null,
            maxRange: null,
            error: 'API key not configured',
            testedAt: null,
          };
          allResults[chainId] = { ...chainResults };
          setResults({ ...allResults });
          saveResults(allResults);
          continue;
        }

        setProgress({
          current: completed,
          total: totalTestable,
          label: `${chain.name} - ${provider.name}`,
        });

        const result = await benchmarkProvider(url, chain);
        chainResults[provider.name] = result;
        completed++;

        allResults[chainId] = { ...chainResults };
        setResults({ ...allResults });
        saveResults(allResults);
      }
    }

    setProgress({ current: totalTestable, total: totalTestable, label: 'Done' });
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
