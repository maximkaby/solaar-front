export const TOKEN_DECIMALS = 9;

export enum Networks {
  UNKNOW = 0,
  HARDHAT = 31337,
  BSC_TESTNET = 97,
  BSC = 56,
}

export const RPC_URL = {
  [Networks.HARDHAT]: 'http://localhost:8545',
  [Networks.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  [Networks.BSC]: `https://bsc-dataseed.binance.org/`
};

export const DEFAULT_NETWORK = Networks.BSC_TESTNET;
