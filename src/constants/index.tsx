export const THE_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/drondin/olympus-graph";
export const EPOCH_INTERVAL = 2200;

// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 13.14;
export const TOKEN_DECIMALS = 9;
export * from './blockchain';

interface IPoolGraphURLS {
  [index: string]: string;
}

export const POOL_GRAPH_URLS: IPoolGraphURLS = {
  4: "https://api.thegraph.com/subgraphs/name/pooltogether/rinkeby-v3_4_3",
  1: "https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether-v3_4_3",
};

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  97: {
    IDO: '0x8B1cdcd2C4A9D2429409043351ae8239469a7C42',
    AVAX_USDC: '0xcD7F227Eb37317b636bC2D3Af55f22267c8FFDe5',
    IBO_MINT: '0x78FAA5FcF759Cf2E378697903a722a1CdE4f00F5',
    BOND_NFT: '0x8b46e1B00E7afef02B01a78881D36075A32960DE',
    UST: '0x176975Ea8ec235ca5c6859d94B7AD53416d135f5',
    // GAIA address
    GAIA_ADDRESS: "0x73b2126B04fE482610aA34c8F875440c00d879Fc",
    // GAIA address
    GAIA_CIRCULATING_SUPPLY: "0x1668638B870Cc4e2E3BAE530FA0194eb935B9164",
    // GAIA address
    STAKING_ADDRESS: "0xB1fac69cE13DeF7029adA2eA640cE64cb6dA3cE9",
    // GAIA address
    STAKING_HELPER_ADDRESS: "0xAbc356596252e20D227cE519CEA8966fC05e78D9",
    // GAIA address
    SGAIA_ADDRESS: "0x5143Dc120767aC30CE7FD4896A31A6e7CBcc25d4",
    // GAIA address
    TREASURY_ADDRESS: "0x496f3DB5d58C68Ae68a81b35e117693Cd749eabb",
    // GAIA address
    BONDINGCALC_ADDRESS: "0xe76d5A9A7D9EAf3903C6795AD15632EB8EfcCF38",
    REDEEM_HELPER_ADDRESS: "0xBd35d8b2FDc2b720842DB372f5E419d39B24781f",
  },
  // BSC mainnet
  56: {
    IDO: '0x86792a4e48C4234Ce9a9B79279fe3006c632FDE3',
    AVAX_USDC: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    IBO_MINT: '',
    BOND_NFT: '0x8b46e1B00E7afef02B01a78881D36075A32960DE',
    // GAIA address
    GAIA_ADDRESS: "0x9f6aEDcA032b1092E08b848FC9D6F29139370837",
    // GAIA address
    GAIA_CIRCULATING_SUPPLY: "0x2b299552A26bd82F0564078b1594a7494Bb38541",
    // GAIA address
    STAKING_ADDRESS: "0x89884B045Ed93067b28C2554a9CB877a41a8fA73",
    // GAIA address
    STAKING_HELPER_ADDRESS: "0x65f7ABcB743eD25951Ba43c19b235b7273f25d52",
    // GAIA address
    SGAIA_ADDRESS: "0x6F9f2B703c9f0B69c19e5762480086D3C7529769",
    // GAIA address
    BONDINGCALC_ADDRESS: "0xad56B36F43C0de88154d341c28f88872383c7ad5",
    // GAIA address
    TREASURY_ADDRESS: "0x15E5A559e67Cb6CAB391821635B351D43E2371b2",
    REDEEM_HELPER_ADDRESS: "0xBd35d8b2FDc2b720842DB372f5E419d39B24781f",
  }
};

export const TOKEN_NAME = 'SOLR';

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/SolaarProtocol',
  discord: 'https://discord.com/invite/gyERfDweEs',
  github: '',
  docs: '',
  telegram: 'https://t.me/SolaarProtocol',
  medium: 'https://medium.com/@SolaarProtocol/community-nft-bond-launch-a8fa1f664b31'
}

export const BOND_TYPES = {
  COMMON: 1,
  RARE: 2,
  LEGENDARY: 3,
};

export const BOND_TYPES_BY_NAME = Object.keys(BOND_TYPES).reduce((acc: any, value) => {
  acc[value] = value;
  return acc;
}, {})



export const USDC_DECIMALS = 10**6;
export const UST_DECIMALS = 10**18;
export const GAIA_DECIMALS = 10**9;

export const INPUT_NUMBER_REGEXP = /^[0-9]*\.?[0-9]*$/;

export const STAKE_POINTS = [30, 90, 180, 360];
export const BOND_POINTS = [5, 14, 30, 60, 90];
