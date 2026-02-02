// ERC-20 Transfer event topic: Transfer(address,address,uint256)
export const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

export const CHAINS = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    chainId: 1,
    testContract: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
    avgBlockTime: 12,
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    chainId: 42161,
    testContract: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', // USDC
    avgBlockTime: 0.25,
  },
  {
    id: 'polygon',
    name: 'Polygon',
    chainId: 137,
    testContract: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // USDT
    avgBlockTime: 2,
  },
  {
    id: 'optimism',
    name: 'Optimism',
    chainId: 10,
    testContract: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', // USDC
    avgBlockTime: 2,
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    chainId: 43114,
    testContract: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', // USDT
    avgBlockTime: 2,
  },
  {
    id: 'base',
    name: 'Base',
    chainId: 8453,
    testContract: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC
    avgBlockTime: 2,
  },
  {
    id: 'bnb',
    name: 'BNB Chain',
    chainId: 56,
    testContract: '0x55d398326f99059fF775485246999027B3197955', // USDT
    avgBlockTime: 3,
  },
  {
    id: 'gnosis',
    name: 'Gnosis',
    chainId: 100,
    testContract: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', // WXDAI
    avgBlockTime: 5,
  },
  {
    id: 'scroll',
    name: 'Scroll',
    chainId: 534352,
    testContract: '0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4', // USDC
    avgBlockTime: 3,
  },
  {
    id: 'zksync',
    name: 'zkSync Era',
    chainId: 324,
    testContract: '0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4', // USDC
    avgBlockTime: 1,
  },
  {
    id: 'linea',
    name: 'Linea',
    chainId: 59144,
    testContract: '0x176211869cA2b568f2A7D4EE941E073a821EE1ff', // USDC
    avgBlockTime: 2,
  },
  {
    id: 'metis',
    name: 'Metis',
    chainId: 1088,
    testContract: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000', // METIS
    avgBlockTime: 4,
  },
  {
    id: 'fantom',
    name: 'Fantom',
    chainId: 250,
    testContract: '0x049d68029688eAbF473097a2fC38ef61633A3C7A', // fUSDT
    avgBlockTime: 1,
  },
  {
    id: 'mantle',
    name: 'Mantle',
    chainId: 5000,
    testContract: '0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE', // USDT
    avgBlockTime: 2,
  },
  {
    id: 'blast',
    name: 'Blast',
    chainId: 81457,
    testContract: '0x4300000000000000000000000000000000000004', // WETH
    avgBlockTime: 2,
  },
  {
    id: 'zkevm',
    name: 'Polygon zkEVM',
    chainId: 1101,
    testContract: '0x1E4a5963aBFD975d8c9021ce480b42188849D41d', // USDT
    avgBlockTime: 5,
  },
  {
    id: 'celo',
    name: 'Celo',
    chainId: 42220,
    testContract: '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e', // USDT
    avgBlockTime: 5,
  },
];
