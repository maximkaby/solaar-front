import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider, { Handle } from 'rc-slider'
import { BigNumber, ethers } from 'ethers';
import { abi as IERC20ABI } from 'src/abi/gaia/IERC20.json';
import 'rc-slider/assets/index.css';
import { ReactComponent as GaiaLogo } from "src/assets/icons/gaia-logo-tree.svg";
import { useWeb3Context } from "src/hooks";
import { screenMaxSize } from "src/themes/global";
import InputTokens from "./InputTokens";
import { useIDOContract } from "../hooks";
import {
  USDC_DECIMALS,
  TOKEN_NAME,
  addresses
} from "src/constants";
import { IERC20 } from "src/typechain";
import SoldOut from "../SoldOut";
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import { error, info } from "src/slices/MessagesSlice";
import { useDispatch } from "react-redux";
import { useIDOContextData } from "../IDOContext";
import { round } from "lodash";
import { getErrMessage } from "src/helpers";

const PresaleBuyTokensWrap = styled.div`
  width: 691px;
  min-height: 300px;
  padding: 24px 42px;
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 18px;
  & .rc-slider-handle {
    box-shadow: none!important;
    cursor: auto;
    border-color: #EEEEEE;
    height: 40px;
    width: 40px;
    margin-left: 0;
    margin-top: -16px;
    padding: 4px;
    @media ${screenMaxSize.sm} {
      height: 35px;
      width: 35px;
      padding: 2px;
    }
  }

  @media ${screenMaxSize.sm} {
    width: 100%;
    padding: 24px;
  }
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18.5px;
  color: #042D3A;
  line-height: 31px;
  margin-bottom: 17px;
  @media ${screenMaxSize.sm} {
    font-size: 20px;
  }
`;

const TokensInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TokensBoughtWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TokensBought = styled.div`
  font-weight: 600;
  font-size: 30px;
  color: #00C07C;
  @media ${screenMaxSize.sm} {
    font-size: 24px;
  }
`;

const TokensCount = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #8AA8B1;
  text-align: right;
  @media ${screenMaxSize.sm} {
    font-size: 24px;
  }
`;

const TokensLogo = styled.div`
  margin-right: 14px;
  svg {
    height: 40px;
    width: 41px;
    @media ${screenMaxSize.sm} {
      height: 38px;
      width: 39px;
    }
  }
`;

const GaiaLogoStyled = styled(GaiaLogo)`
  width: 100%;
  height: 100%;
`;

const RaisedInfoWrap = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #8AA8B1;
  margin-bottom: 25px;
  @media ${screenMaxSize.sm} {
    font-size: 20px;
  }
`;

const RaisedValue = styled.span`
  color: #042D3A;
  margin-right: 6px;
`;

const JoinPresaleWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const JoinPresale = styled.div`
  width: 216px;
  height: 52.8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00C07C;
  border-radius: 9.6px;
  font-weight: bold;
  font-size: 19.2px;
  color: #FFFFFF;
  cursor: pointer;
`;

const SliderWrap = styled.div`
  margin-bottom: 10px;
`;

const InputTokensBlock = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const InputTokensWrap = styled.div`
  margin-bottom: 20px;
`;

const BuyButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 216px;
  height: 52.8px;
  background: #00C07C;
  border-radius: 9.6px;
  font-size: 19.2px;
  color: white;
  font-weight: 700;
  cursor: pointer;
`;

const CircularProgress = styled(MuiCircularProgress)`
  color: #00C07C!important;
`;

const TokenTotal = styled.span`
  color: #00C07C;
  font-weight: bold;
`;


const getKeyAllowance = (address: any) => {
  return `WALLET_ALLOWANCE_${address}`;
}

const CircularProgressWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PresaleBuyTokens = () => {
  const dispatch = useDispatch();
  const {
    address: walletOwner,
    connect,
    connected,
    provider,
    chainID: networkID
  } = useWeb3Context();
  const [value, setValue] = useState('');
  const [hasAllowance, setHasAllowance] = useState(
    !!localStorage.getItem(getKeyAllowance(walletOwner))
  );
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  const {
    IDOContract,
    loading,
    setLoading,
    loadDetails,
    loadDetailsWithLoader,
    loadPurchaseAmount
  } = useIDOContract();

  const {
    offeringAmount,
    countBoughtTokens,
    salePriceGaia,
    isSaleFinished,
    purchasedAmount
  } = useIDOContextData();

  const USDCContract = new ethers.Contract(addresses[networkID].AVAX_USDC, IERC20ABI, provider.getSigner()) as IERC20;
  const checkAllowance = async () => {
    const transferAllowance = await USDCContract.allowance(walletOwner, addresses[networkID].IDO);
    const value = !!Number(transferAllowance);
    setHasAllowance(value);
    localStorage.setItem(getKeyAllowance(walletOwner), String(value));
  }

  useEffect(() => {
    if (connected) {
      // if (localStorage.getItem(getKeyAllowance(walletOwner)) === 'true') {
      //   return;
      // }
      setLoadingTransaction(true);
      checkAllowance().then(() => {
        setLoadingTransaction(false);
      });
    }
  }, [connected]);


  const getApprove = async () => {
    setLoadingTransaction(true);
    let approveTx = await USDCContract.approve(
      addresses[networkID].IDO,
      String(40000 * USDC_DECIMALS)
    ).then(() => {
      localStorage.setItem(getKeyAllowance(walletOwner), 'true');
      setHasAllowance(true);
    }).catch((err: any) => {
      dispatch(error(getErrMessage(err)));
      setHasAllowance(false);
    }).finally(() => {
      setLoadingTransaction(false);
    });
  }

  const buyTokensHandler = async () => {
    try {
      setLoadingTransaction(true);
      const tx = await IDOContract
        .connect(provider.getSigner())
        .purchaseGAIA(String(Number(value) * salePriceGaia * USDC_DECIMALS));
      await tx.wait(1);
      await loadDetails();
      await loadPurchaseAmount();
      setLoadingTransaction(false);
      dispatch(info(`Purchased ${value} ${TOKEN_NAME} successfully`))
    } catch (err: any) {
      dispatch(error(getErrMessage(err)))
      setLoadingTransaction(false);
    } finally {
      setLoadingTransaction(false);
    }
  }

  const connectNetwork = async () => {
    try {
      setLoadingTransaction(true);
      const res = await connect()
      if (!res) {
        dispatch(error('Wrong network, please switch to Avalanche Network'))
        return;
      }
      setTimeout(() => {
        setLoadingTransaction(false);
      }, 500);
    } catch (e) {
      dispatch(error('Something is wrong, please check Network'))
    }
  }

  useEffect(() => {
    loadDetailsWithLoader();
  }, []);


  if (loading) {
    return (
      <PresaleBuyTokensWrap>
        <Title>
          Total raised {TOKEN_NAME}
        </Title>
        <CircularProgressWrap>
          <CircularProgress />
        </CircularProgressWrap>
      </PresaleBuyTokensWrap>
    );
  }

  return (
    <PresaleBuyTokensWrap>
      <Title>
        Total {TOKEN_NAME} sold
      </Title>
      <TokensInfo>
        <TokensBoughtWrap>
          <TokensLogo>
            <GaiaLogo></GaiaLogo>
          </TokensLogo>
          <TokensBought>
            {round(countBoughtTokens)} {TOKEN_NAME}
          </TokensBought>
        </TokensBoughtWrap>
        <TokensCount>
          {offeringAmount} {TOKEN_NAME}
        </TokensCount>
      </TokensInfo>
      <SliderWrap>
        <Slider
          value={countBoughtTokens}
          min={0}
          max={offeringAmount}
          draggableTrack={false}
          trackStyle={{ backgroundColor: '#00C07C', height: 7 }}
          railStyle={{ backgroundColor: '#F1F3F5', height: 7 }}
          handle={ (handleProps) => {
            return (
              <Handle { ...handleProps }>
                <GaiaLogoStyled />
              </Handle>
            );
          }}
        />
      </SliderWrap>
      <RaisedInfoWrap>
        <RaisedValue>
          ${round(countBoughtTokens * salePriceGaia, 2)}
        </RaisedValue>
        raised.&nbsp;
        {!!purchasedAmount &&
          <span>You bought &nbsp;
            <TokenTotal>{round(purchasedAmount, 2)} {TOKEN_NAME}</TokenTotal>
          </span>
        }
      </RaisedInfoWrap>
      {connected ?
        <div>
          {isSaleFinished ?
            <SoldOut />
            :
            <InputTokensBlock>
              {!hasAllowance ?
                <div>
                  {loadingTransaction ?
                    <CircularProgressWrap>
                      <CircularProgress />
                    </CircularProgressWrap>
                    :
                    <BuyButton onClick={getApprove}>
                      Approve
                    </BuyButton>
                  }
                </div>
                :
                <>
                  <InputTokensWrap>
                    <InputTokens
                      value={value}
                      onChange={setValue} />
                  </InputTokensWrap>
                  {loadingTransaction ?
                    <CircularProgressWrap>
                      <CircularProgress />
                    </CircularProgressWrap>
                    :
                    <div>
                      <BuyButton onClick={buyTokensHandler}>
                        Buy {TOKEN_NAME}
                      </BuyButton>
                    </div>
                  }
                </>
              }
            </InputTokensBlock>
          }
        </div>
        :
        <JoinPresaleWrap>
          <JoinPresale onClick={connectNetwork}>
            Join pre-sale
          </JoinPresale>
        </JoinPresaleWrap>
      }
    </PresaleBuyTokensWrap>
  )
}

export default PresaleBuyTokens;