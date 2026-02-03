import { TRANSFER_TOPIC } from '../config/chains';

const RANGE_STEPS = [100, 500, 1000, 2000, 3500, 5000, 10000, 20000, 50000];

async function rpcCall(url, method, params, timeout = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const start = performance.now();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
      signal: controller.signal,
    });
    const elapsed = Math.round(performance.now() - start);
    clearTimeout(timer);

    if (res.status === 429) {
      return { ok: false, elapsed, error: 'Rate limited (429)' };
    }
    if (res.status === 403) {
      return { ok: false, elapsed, error: 'Forbidden (403)' };
    }

    let json;
    try {
      json = await res.json();
    } catch {
      return { ok: false, elapsed, error: `HTTP ${res.status}: non-JSON response` };
    }

    if (json.error) {
      return { ok: false, elapsed, error: json.error.message || JSON.stringify(json.error) };
    }
    return { ok: true, elapsed, result: json.result };
  } catch (err) {
    clearTimeout(timer);
    const elapsed = Math.round(performance.now() - start);
    if (err.name === 'AbortError') {
      return { ok: false, elapsed, error: 'Timeout' };
    }
    // In browsers, CORS failures and network errors both throw TypeError
    return { ok: false, elapsed, error: err.message };
  }
}

function toHex(n) {
  return '0x' + Math.floor(n).toString(16);
}

export async function getLatestBlock(url) {
  return rpcCall(url, 'eth_blockNumber', []);
}

export async function testLatency(url, chain, latestBlockHex) {
  const latest = parseInt(latestBlockHex, 16);
  const from = latest - 100;

  return rpcCall(url, 'eth_getLogs', [{
    address: chain.testContract,
    topics: [TRANSFER_TOPIC],
    fromBlock: toHex(from),
    toBlock: toHex(latest),
  }]);
}

export async function findMaxRange(url, chain, latestBlockHex) {
  const latest = parseInt(latestBlockHex, 16);
  let maxWorking = 0;

  for (const range of RANGE_STEPS) {
    const from = latest - range;
    if (from < 0) break;

    const result = await rpcCall(url, 'eth_getLogs', [{
      address: chain.testContract,
      topics: [TRANSFER_TOPIC],
      fromBlock: toHex(from),
      toBlock: toHex(latest),
    }], 20000);

    if (result.ok) {
      maxWorking = range;
    } else {
      break;
    }
  }

  return maxWorking;
}

function classifyError(errorMsg) {
  const lower = (errorMsg || '').toLowerCase();
  if (lower.includes('rate limit') || lower.includes('429') || lower.includes('too many request')) {
    return 'rate_limited';
  }
  if (lower.includes('unauthorized') || lower.includes('api key') || lower.includes('authenticate') || lower.includes('invalid project') || lower.includes('forbidden') || lower.includes('403')) {
    return 'auth_required';
  }
  if (lower.includes('pruned') || lower.includes('history')) {
    return 'pruned';
  }
  if (lower.includes('timeout') || lower.includes('timed out')) {
    return 'timeout';
  }
  if (lower.includes('cors') || lower.includes('failed to fetch') || lower.includes('networkerror') || lower.includes('load failed')) {
    return 'cors_blocked';
  }
  return 'error';
}

/**
 * Resolve the actual URL for a provider, substituting API keys if needed.
 * Returns null if the provider requires a key that isn't configured.
 */
export function resolveUrl(provider, apiKeys) {
  if (!provider.requiresKey) return provider.url;
  const key = apiKeys[provider.keyName];
  if (!key) return null;
  return provider.url.replace('{API_KEY}', key);
}

export async function benchmarkProvider(url, chain, onProgress) {
  const result = {
    status: 'testing',
    latencyMs: null,
    maxRange: null,
    error: null,
    testedAt: Date.now(),
  };

  // Step 1: Get latest block
  if (onProgress) onProgress('Getting latest block...');
  const blockResult = await getLatestBlock(url);
  if (!blockResult.ok) {
    result.status = classifyError(blockResult.error);
    result.error = blockResult.error;
    return result;
  }

  const latestBlockHex = blockResult.result;

  // Step 2: Latency test
  if (onProgress) onProgress('Testing latency...');
  const latencyResult = await testLatency(url, chain, latestBlockHex);
  if (!latencyResult.ok) {
    result.status = classifyError(latencyResult.error);
    result.error = latencyResult.error;
    result.latencyMs = latencyResult.elapsed;
    return result;
  }
  result.latencyMs = latencyResult.elapsed;

  result.status = 'ok';
  return result;
}
