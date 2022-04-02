import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";

import { ReactComponent as wETHImg } from "src/assets/tokens/wETH.svg";
import { ReactComponent as AVAX } from "src/assets/tokens/AVAX.svg";
import { ReactComponent as USDC } from "src/assets/tokens/USDC.svg";
import { ReactComponent as GAIAUSDC } from "src/assets/tokens/GAIA-USDC.svg";

import { abi as BondOhmDaiContract } from "src/abi/bonds/OhmDaiContract.json";

import { abi as ReserveOhmDaiContract } from "src/abi/reserves/OhmDai.json";

import { abi as LusdBondContract } from "src/abi/bonds/LusdContract.json";
import { abi as EthBondContract } from "src/abi/bonds/EthContract.json";

import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { BigNumberish } from "ethers";
import { getTokenPrice } from "src/helpers";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond


export const usdc = new StableBond({
  name: "usdc",
  displayName: "USDC.e",
  bondToken: "USDC",
  isAvailable: {
    [NetworkID.AVAX_TESTNET]: true,
    [NetworkID.AVAX_MAINNET]: true
  },
  // @ts-ignore
  tokenDecimals: 6,
  tokenDecimalsPrincipal: 6,
  bondIconSvg: USDC,
  bondContractABI: LusdBondContract,
  networkAddrs: {
    [NetworkID.AVAX_TESTNET]: {
      bondAddress: "0xa3769C43a041bFE7fB221D75340c00344A641c93",
      reserveAddress: "0xcD7F227Eb37317b636bC2D3Af55f22267c8FFDe5",
    },
    [NetworkID.AVAX_MAINNET]: {
      bondAddress: "0x21fed4bEF3B3CfAf86A358885A366720618BAd3d",
      reserveAddress: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    },
  },
});

export const eth = new CustomBond({
  name: "eth",
  displayName: "wETH.e",
  lpUrl: "",
  bondType: BondType.StableAsset,
  bondToken: "wETH",
  isAvailable: {
    [NetworkID.AVAX_TESTNET]: true,
    [NetworkID.AVAX_MAINNET]: true
  },
  bondIconSvg: wETHImg,
  bondContractABI: EthBondContract,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  networkAddrs: {
    [NetworkID.AVAX_TESTNET]: {
      bondAddress: "0x4e15eAbCEfeD24c50bBdB681C7FeC9a633C09263",
      reserveAddress: "0xDcD059ECCeB0978FaBf4626340610903694E4f1F",
    },
    [NetworkID.AVAX_MAINNET]: {
      bondAddress: "0xe6ea8e8bBBbC8b2aE5a8866A8Dbcb31D930e56DA",
      reserveAddress: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    },
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    const ethBondContract = this.getContractForBond(networkID, provider);
    let ethPrice: BigNumberish = await ethBondContract.assetPrice();
    ethPrice = Number(ethPrice.toString()) / Math.pow(10, 8);
    const token = this.getContractForReserve(networkID, provider);
    let ethAmount: BigNumberish = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    ethAmount = Number(ethAmount.toString()) / Math.pow(10, 18);
    return ethAmount * ethPrice;
  },
});

export const wavax = new CustomBond({
  name: "avax",
  displayName: "wAVAX",
  lpUrl: "",
  bondType: BondType.StableAsset,
  bondToken: "AVAX",
  isAvailable: {
    [NetworkID.AVAX_TESTNET]: true,
    [NetworkID.AVAX_MAINNET]: true
  },
  bondIconSvg: AVAX,
  bondContractABI: EthBondContract,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  networkAddrs: {
    [NetworkID.AVAX_TESTNET]: {
      bondAddress: "0xddf8a404d51E46F75E3D2BD303B12dB29D04fE4e",
      reserveAddress: "0xd00ae08403b9bbb9124bb305c09058e32c39a48c",
    },
    [NetworkID.AVAX_MAINNET]: {
      bondAddress: "0x3730Ac7a59FD8eECDFdA457358834448B4a0fFc4",
      reserveAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    },
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    let avaxPrice: number = await getTokenPrice("avalanche-2");
    const token = this.getContractForReserve(networkID, provider);
    let avaxAmount: BigNumberish = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    avaxAmount = Number(avaxAmount.toString()) / Math.pow(10, 18);
    return avaxAmount * avaxPrice;
  },
});



export const gaia_usdc = new LPBond({
  name: "gaia_usdc_lp",
  displayName: "GAIA-USDC LP",
  bondToken: "USDC",
  // @ts-ignore
  tokenDecimals: 6,
  isAvailable: {
    [NetworkID.AVAX_TESTNET]: true,
    [NetworkID.AVAX_MAINNET]: true
  },
  bondIconSvg: GAIAUSDC,
  bondContractABI: BondOhmDaiContract,
  reserveContract: ReserveOhmDaiContract,
  networkAddrs: {
    [NetworkID.AVAX_TESTNET]: {
      bondAddress: "0xD136c6bD65709e5a81c6066C1D5f42b38FC6A0d2",
      reserveAddress: "0xb69Efd2a3AEA8d4A9FA5E15F048d73446038Fc0A",
    },
    [NetworkID.AVAX_MAINNET]: {
      bondAddress: "0xDc867d93Cc3F3289282712D68A54EbAc1855c63c",
      reserveAddress: "0x6Ca7AAc252FeD4894132Ae6E6d96bFc739d9FC3a",
    },
  },
  lpUrl:
    "https://traderjoexyz.com/#/pool/0x9f6aEDcA032b1092E08b848FC9D6F29139370837/0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
});


// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [
  // gaia_usdc,
  usdc,
  wavax,
  eth
];
// TODO (appleseed-expiredBonds): there may be a smarter way to refactor this
export const allExpiredBonds = [];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
