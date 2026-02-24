# RPC Provider Benchmark

Compare RPC provider latency and log query range across 17 EVM chains and 100+ endpoints.

**Live:** [tools.traversa.dev/rpc](https://tools.traversa.dev/rpc)

## Features

- **17 chains** - Ethereum, Arbitrum, Polygon, Optimism, Avalanche, Base, BNB Chain, Gnosis, Scroll, zkSync Era, Linea, Metis, Fantom, Mantle, Blast, Polygon zkEVM, and Celo
- **100+ endpoints** - Public providers (PublicNode, dRPC, OMNIA, Nodies, Tenderly, Lava, Merkle, and more) plus authenticated providers (Infura, Alchemy, Ankr)
- **Latency testing** - Measures response time for `eth_getLogs` queries
- **Max log range detection** - Finds the largest block range each provider supports for `eth_getLogs` by testing progressively larger ranges
- **Sortable results** - Sort by provider, status, latency, max range, or URL
- **Color-coded metrics** - Green/yellow/red indicators for latency and range quality
- **Status classification** - OK, Auth Required, Pruned, Timeout, CORS Blocked, Rate Limited, Error
- **Persistent results** - Benchmark data saved to localStorage across sessions
- **Dark/light theme** - Toggle with system preference detection

## How It Works

For each provider, the benchmark:

1. Fetches the latest block number via `eth_blockNumber`
2. Measures latency by querying ERC-20 Transfer events over the last 100 blocks
3. Tests increasingly larger block ranges (100 to 50k) to find the maximum supported `eth_getLogs` range

All testing runs client-side in the browser. No backend required.

## Tech Stack

- React 19, Vite

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## API Keys

Optional API keys for Infura, Alchemy, and Ankr can be configured via the API Keys panel in the app. Keys are stored in browser localStorage only.
