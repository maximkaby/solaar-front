import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import IBOSolaarABI from "src/abi/SolaarIBO.json";
import BondNFTContractABI from 'src/abi/BondNFTContract.json'
import { abi as ERC20ABI } from 'src/abi/IERC20.json';
import { useWeb3Context } from "src/hooks";
import { GAIA_DECIMALS, USDC_DECIMALS, addresses } from "src/constants";
import { round } from "lodash";
import { useIBOContextData } from "src/context/IBOContext";


const isAllSold = (offeringAmountContract: any, totalAmountContract: any) => {
  if ((Number(offeringAmountContract - totalAmountContract)) === Number(offeringAmountContract)) {
    return true;
  }
  return false;
};


export const useIBOContract = () => {
  const { provider, chainID: networkID, address } = useWeb3Context();
  const { getData, getBondsInfo } = useIBOContextData();
  const IBOContract = useMemo(() => {
    return new ethers.Contract(addresses[networkID].IBO_MINT, IBOSolaarABI, provider)
  }, []);

  const BondNFTContract = useMemo(() => {
    return new ethers.Contract(addresses[networkID].BOND_NFT, BondNFTContractABI, provider)
  }, []);

  const USTContract = useMemo(() => {
    return new ethers.Contract(addresses[networkID].UST, ERC20ABI, provider)
  }, []);

  const [salePriceGaia, setSalePriceGaia] = useState(0);
  const [loading, setLoading] = useState(true);
  const [endOfSells, setEndOfSells] = useState(0);
  // @ts-ignore
  window.IBOContract = IBOContract
  // @ts-ignore
  window.BondNFTContract = BondNFTContract;
  // @ts-ignore
  window.ethers = ethers;

  // @ts-ignore
  window.testPurchase = async (value) => {
    await IBOContract
      .connect(provider.getSigner())
      .purchaseGAIA((salePriceGaia * value * USDC_DECIMALS).toString());
  }

  const loadDetails = async () => {
    Promise.all([
      IBOContract.bondsTotal(),
      IBOContract.bondsSold(),
      IBOContract.price(),
      BondNFTContract.bondsOwnershipLimit(),
    ]).then(res => {
      const [
        bondsTotal,
        bondsSold,
        bondPrice,
        bondsOwnershipLimit
      ] = res;
      // @ts-ignore

      getData({
        bondsTotal: Number(bondsTotal),
        bondsSold: Number(bondsSold),
        bondPrice: Number(ethers.utils.formatEther(bondPrice)),
        bondsOwnershipLimit: Number(bondsOwnershipLimit)
      });
    });
  }

  const loadPurchaseBonds = async () => {
    const getBondsTypes = async () => {
      const indexTotal = await BondNFTContract.balanceOf(address);
      const promises = [];
      for (let index = 0; index < indexTotal; index++) {
        promises.push(BondNFTContract.tokenOfOwnerByIndex(address, index));
      }

      const nftIndexes = (await Promise.all(promises)).map(Number);
      const tokenTypesPromises = nftIndexes.map((tokenId) => {
        return IBOContract.bondType(tokenId);
      });

      const tokenTypes = await Promise.all(tokenTypesPromises);
      const tokenIdsByType = tokenTypes.reduce((acc, value, index) => {
        if (!acc[value]) {
          acc[value] = [];
        }
        acc[value].push(nftIndexes[index]);
        return acc;
      }, {});
      getBondsInfo(tokenTypes.map(Number));
      getData({
        tokenIdsByType
      });
    }
    getBondsTypes();

    const bondsPurchased = await IBOContract.bondsPurchased(address);
    getData({
      bondsPurchased: Number(bondsPurchased),
    });
  }

  useEffect(() => {
    if (!address) {
      return;
    }

    loadPurchaseBonds()
  }, [address])

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetailsWithLoader = async () => {
    setLoading(true);
    await loadDetails();
    setLoading(false);
  }

  return {
    IBOContract,
    USTContract,
    loading,
    setLoading,
    endOfSells,
    loadDetails,
    loadDetailsWithLoader,
    loadPurchaseBonds
  };
}

export const useIBONFTContract = () => {

}

