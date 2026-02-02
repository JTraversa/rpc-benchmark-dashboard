// RPC providers per chain. Each entry: { name, url }
// Only free, no-API-key endpoints.

const PROVIDERS = {
  ethereum: [
    { name: 'PublicNode', url: 'https://ethereum-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/eth' },
    { name: 'dRPC', url: 'https://eth.drpc.org' },
    { name: 'Cloudflare', url: 'https://cloudflare-eth.com' },
    { name: 'LlamaRPC', url: 'https://eth.llamarpc.com' },
    { name: 'MeowRPC', url: 'https://eth.meowrpc.com' },
  ],
  arbitrum: [
    { name: 'PublicNode', url: 'https://arbitrum-one-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/arb' },
    { name: 'dRPC', url: 'https://arbitrum.drpc.org' },
    { name: 'Official', url: 'https://arb1.arbitrum.io/rpc' },
    { name: 'LlamaRPC', url: 'https://arbitrum.llamarpc.com' },
    { name: 'BlastAPI', url: 'https://arbitrum-one.public.blastapi.io' },
  ],
  polygon: [
    { name: 'PublicNode', url: 'https://polygon-bor-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/matic' },
    { name: 'dRPC', url: 'https://polygon.drpc.org' },
    { name: 'Official', url: 'https://polygon-rpc.com' },
    { name: 'LlamaRPC', url: 'https://polygon.llamarpc.com' },
    { name: 'MeowRPC', url: 'https://polygon.meowrpc.com' },
  ],
  optimism: [
    { name: 'PublicNode', url: 'https://optimism-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/op' },
    { name: 'dRPC', url: 'https://optimism.drpc.org' },
    { name: 'Official', url: 'https://mainnet.optimism.io' },
    { name: 'Tenderly', url: 'https://optimism.gateway.tenderly.co' },
    { name: 'MeowRPC', url: 'https://optimism.meowrpc.com' },
  ],
  avalanche: [
    { name: 'PublicNode', url: 'https://avalanche-c-chain-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/avax/c' },
    { name: 'dRPC', url: 'https://avalanche.drpc.org' },
    { name: 'Official', url: 'https://api.avax.network/ext/bc/C/rpc' },
    { name: 'MeowRPC', url: 'https://avax.meowrpc.com' },
  ],
  base: [
    { name: 'PublicNode', url: 'https://base-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/base' },
    { name: 'dRPC', url: 'https://base.drpc.org' },
    { name: 'Official', url: 'https://mainnet.base.org' },
    { name: 'LlamaRPC', url: 'https://base.llamarpc.com' },
    { name: 'MeowRPC', url: 'https://base.meowrpc.com' },
  ],
  bnb: [
    { name: 'PublicNode', url: 'https://bsc-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/bnb' },
    { name: 'dRPC', url: 'https://bsc.drpc.org' },
    { name: 'Official', url: 'https://bsc-dataseed.binance.org' },
    { name: 'MeowRPC', url: 'https://bsc.meowrpc.com' },
  ],
  gnosis: [
    { name: 'PublicNode', url: 'https://gnosis-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/gnosis' },
    { name: 'dRPC', url: 'https://gnosis.drpc.org' },
    { name: 'Official', url: 'https://rpc.gnosischain.com' },
    { name: 'BlastAPI', url: 'https://gnosis-mainnet.public.blastapi.io' },
  ],
  scroll: [
    { name: 'PublicNode', url: 'https://scroll-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/scroll' },
    { name: 'dRPC', url: 'https://scroll.drpc.org' },
    { name: 'Official', url: 'https://rpc.scroll.io' },
  ],
  zksync: [
    { name: 'PublicNode', url: 'https://zksync-era-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/zksync2-era' },
    { name: 'dRPC', url: 'https://zksync.drpc.org' },
    { name: 'Official', url: 'https://mainnet.era.zksync.io' },
    { name: 'MeowRPC', url: 'https://zksync.meowrpc.com' },
  ],
  linea: [
    { name: 'PublicNode', url: 'https://linea-rpc.publicnode.com' },
    { name: '1RPC', url: 'https://1rpc.io/linea' },
    { name: 'dRPC', url: 'https://linea.drpc.org' },
    { name: 'Official', url: 'https://rpc.linea.build' },
  ],
  metis: [
    { name: 'Nodies', url: 'https://metis-pokt.nodies.app' },
    { name: 'dRPC', url: 'https://metis.drpc.org' },
    { name: 'Official', url: 'https://andromeda.metis.io/?owner=1088' },
  ],
};

export default PROVIDERS;
