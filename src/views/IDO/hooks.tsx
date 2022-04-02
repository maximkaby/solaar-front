import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import IDOContractABI from "src/abi/gaia/IDOContract.json";
import { useWeb3Context } from "src/hooks";
import { GAIA_DECIMALS, USDC_DECIMALS, addresses } from "src/constants";
import { round } from "lodash";
import { useIDOContextData } from "./IDOContext";


const isAllSold = (offeringAmountContract: any, totalAmountContract: any) => {
  if ((Number(offeringAmountContract - totalAmountContract)) === Number(offeringAmountContract)) {
    return true;
  }
  return false

}


export const useIDOContract = () => {
  const { provider, chainID: networkID, address } = useWeb3Context();
  const { getData } = useIDOContextData();
  const IDOContract = useMemo(() => {
    return new ethers.Contract(addresses[networkID].IDO, IDOContractABI, provider)
  }, []);
  const [salePriceGaia, setSalePriceGaia] = useState(0);
  const [loading, setLoading] = useState(true);
  const [endOfSells, setEndOfSells] = useState(0);
  // @ts-ignore
  window.IDOContract = IDOContract

  // @ts-ignore
  window.testPurchase = async (value) => {
    await IDOContract
      .connect(provider.getSigner())
      .purchaseGAIA((salePriceGaia * value * USDC_DECIMALS).toString());
  }

  const loadDetails = async () => {
    Promise.all([
      IDOContract.salePrice(),
      IDOContract.maxAllotmentPerBuyer(),
      IDOContract.offeringAmount(),
      IDOContract.totalAmount(),
      IDOContract.endOfEntireSale(),
      IDOContract.startOfSale(),
      IDOContract.endOfWLSale(),
      IDOContract.finalized(),
    ]).then(res => {
      const [
        salePriceGaiContract,
        maxAllotmentContract,
        offeringAmountContract,
        totalAmountContract,
        endOfEntireSaleTime,
        startOfSaleContract,
        endOfWLSaleContract,
        finalized
      ] = res;
      // @ts-ignore

      console.log(Number(endOfEntireSaleTime) * 1000 < new Date(), 'endOfEntireSaleTime');
      setSalePriceGaia(Number(salePriceGaiContract) / USDC_DECIMALS);
      setEndOfSells(endOfEntireSaleTime);
      const boughtTokens = Number(offeringAmountContract - totalAmountContract) / GAIA_DECIMALS;

      let isSaleFinished = false
      if (isAllSold(offeringAmountContract, totalAmountContract) ||
        // @ts-ignore
        Number(endOfEntireSaleTime) * 1000 < new Date()
        || finalized
      ) {
        isSaleFinished = true;
      }

      console.log(endOfWLSaleContract, 'endOfWLSaleContract');

      getData({
        salePriceGaia: Number(salePriceGaiContract) / USDC_DECIMALS,
        maxAllotment: Number(maxAllotmentContract),
        offeringAmount: Number(offeringAmountContract) / GAIA_DECIMALS,
        endOfSaleTime: Number(endOfEntireSaleTime) * 1000,
        countBoughtTokens: round(boughtTokens, 2),
        isSaleFinished: isSaleFinished,
        startOfSaleTime: Number(startOfSaleContract) * 1000,
        endOfWLSaleTime: Number(endOfWLSaleContract) * 1000,
      })
    });
  }

  const loadPurchaseAmount = async () => {
    const purchasedAmount = await IDOContract.purchasedAmount(address);
    getData({
      purchasedAmount: Number(purchasedAmount) / GAIA_DECIMALS,
    })
  }

  useEffect(() => {
    if (!address) {
      return;
    }

    loadPurchaseAmount()
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
    IDOContract,
    loading,
    setLoading,
    endOfSells,
    loadDetails,
    loadDetailsWithLoader,
    loadPurchaseAmount
  };
}