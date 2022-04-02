import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  Typography,
  Zoom,
  Divider,
} from "@material-ui/core";
import { t, Trans } from "@lingui/macro";
import RebaseTimer from "../../components/RebaseTimer/RebaseTimer";
import TabPanel from "../../components/TabPanel";
import { trim, getErrMessage } from "src/helpers";
import { changeApproval, changeStake } from "../../slices/StakeThunk";
import "./stake.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { Skeleton } from "@material-ui/lab";
import { ethers } from "ethers";
import ZapCta from "../Zap/ZapCta";
import { useAppSelector } from "src/hooks";
import { TOKEN_NAME, STAKE_POINTS, addresses, USDC_DECIMALS, UST_DECIMALS } from "src/constants";
import Slider, { Handle } from 'rc-slider'
import 'rc-slider/assets/index.css';
import styled from "styled-components";
import SliderRange from "src/components/SliderRange/SliderRange";
import Lockupinfo from "src/components/LockupInfo/LockupInfo";
import BondsLeft from "./BondsLeft/BondsLeft";
import { screenMaxSize } from "src/themes/global";
import { ReactComponent as SolaarRoundLogo } from "src/assets/solaar-round-logo.svg";
import { LockupinfoNormal } from "src/components/LockupInfo/LockupInfo";
import MyBonds from './MyBonds/MyBonds';
import InitialBondInfo from './InitialBondInfo/InitialBondInfo';
import BondsOne from 'src/assets/ibo/bond3.png';
import BondsTwo from 'src/assets/ibo/bond2.png';
import BondsThree from 'src/assets/ibo/bond1.png';
import { useIBOContextData } from "src/context/IBOContext";
import { useIBOContract } from "./IBOhooks";
import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { error, info } from "src/slices/MessagesSlice";
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import CommunityInfo from "src/components/CommunityInfo/CommunityInfo";
import Slots from './Slots';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const InfoWrap = styled.div`
  display: flex;
  max-width: 1300px;
  width: 97%;
  @media ${screenMaxSize.sm} {
    flex-direction: column;
  }
`;

const MintWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
  & > div {
    width: 48%;
    @media ${screenMaxSize.sm} {
      width: 100%;
    }
  }
  @media ${screenMaxSize.sm} {
    flex-direction: column;
  }
`;

const MintBlock = styled.div`
  @media ${screenMaxSize.sm} {
    margin-bottom: 15px;
  }
`;

const BondsNFTWrap = styled.div`
  display: flex;
  overflow: scroll;
  border: 2px solid #505050;
  border-radius: 16px;
  padding: 14px;
  img {
    height: 495px;
  }
`;


const ButtonMint = styled(Button)`
  width: 100%;
`;

const MintButtonWrap = styled.div`
`;

const CircularProgressWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const CircularProgress = styled(MuiCircularProgress)`
  color: #F3C980!important;
`;

const CommunityInfoWrap = styled.div`
  margin-top: 20px;
  margin-bottom: 80px;
`;

const getKeyAllowance = (address: any) => {
  return `WALLET_ALLOWANCE_IBO_SOLR_${address}`;
}


function SolaarIBO() {
  const dispatch = useDispatch();
  const {
    provider,
    address : walletOwner,
    connected,
    connect,
    chainID: networkID
  } = useWeb3Context();
  // @ts-ignore
  window.provider = provider;
  const {
    loadDetails,
    IBOContract,
    USTContract,
    loadPurchaseBonds
  } = useIBOContract();
  const [zoomed, setZoomed] = useState(false);
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(
    !!localStorage.getItem(getKeyAllowance(walletOwner))
  );

  const checkAllowance = async () => {
    const transferAllowance = await USTContract.allowance(walletOwner, addresses[networkID].IBO_MINT);
    const value = !!Number(transferAllowance);
    setHasAllowance(value);
    localStorage.setItem(getKeyAllowance(walletOwner), String(value));
  }

  const {
    bondsTotal,
    bondsSold,
    bondPrice,
    bondsOwnershipLimit,
    bondsPurchased
  } = useIBOContextData();

  const BUSDContract = new ethers.Contract('0x22C816abde729c7d09038b1eB037581591071283', ierc20Abi, provider.getSigner());

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

  // @ts-ignore
  window.BUSDContract = BUSDContract

  let modalButton = [];

  modalButton.push(
    <Button
      variant="contained"
      className="connect-button"
      onClick={connect} key={1}
      color="primary"
    >
      <Trans>Connect Wallet</Trans>
    </Button>,
  );

  useEffect(() => {
    loadDetails();
  }, []);


  const onMintClick = async () => {
    try {
      setLoadingTransaction(true);
      const tx = await IBOContract
        .connect(provider.getSigner())
        .purchaseBond(1);
      await tx.wait(1);
      loadDetails();
      loadPurchaseBonds();
      dispatch(info('NFT successfully minted'));
      setLoadingTransaction(false);
    } catch (e) {
      dispatch(error(getErrMessage(e)));
    } finally {
      setLoadingTransaction(false);
    }
  }

  const connectNetwork = async () => {
    try {
      setLoadingTransaction(true);
      const res = await connect()
      if (!res) {
        dispatch(error('Wrong network, please switch to Smart Chain Network'))
        return;
      }
      setTimeout(() => {
        setLoadingTransaction(false);
      }, 500);
    } catch (e) {
      dispatch(error('Something is wrong, please check Network'))
    }
  }

  const getApprove = async () => {
    setLoadingTransaction(true);
    let approveTx;
    try {
      approveTx = await USTContract
        .connect(provider.getSigner())
        .approve(
        addresses[networkID].IBO_MINT,
        ethers.utils.parseUnits('100000', 'ether')
      );
      if (approveTx) {
        await approveTx.wait();
        localStorage.setItem(getKeyAllowance(walletOwner), 'true');
      }
    } catch (err) {
      dispatch(error(getErrMessage(err)));
      setHasAllowance(false);
      setLoadingTransaction(false);
      return;
    } finally {
      setLoadingTransaction(false);
      if (approveTx) {
        setHasAllowance(true);
      }
    }
  }


  return (
    <div id="solr-ibo">
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Paper className={`ohm-card mint`}>
          <Grid container direction="column" spacing={2}>
            <MintWrap>
              <MintBlock>
                <IBOTitle>
                  Solaar IBO (Initial Bond Offering)
                </IBOTitle>
                <BondsLeft count={bondsTotal - bondsSold}/>
                <TokensInfo>
                  <TokensBoughtWrap>
                    <TokensLogo>
                      <SolaarRoundLogo />
                    </TokensLogo>
                    <TokensBought>
                      {/*{round(countBoughtTokens)} {TOKEN_PRESALE_NAME}*/}
                      {/*632829 UST*/}
                      $SOLAAR
                    </TokensBought>
                  </TokensBoughtWrap>
                  <TokensCount>
                    {bondsSold} / {bondsTotal} Bonds Minted
                    {/*{offeringAmount} {TOKEN_PRESALE_NAME}*/}
                  </TokensCount>
                </TokensInfo>
                <SliderWrap>
                  <Slider
                    value={bondsSold}
                    min={0}
                    max={bondsTotal}
                    draggableTrack={false}
                    trackStyle={{ backgroundColor: '#F3C980', height: 17 }}
                    railStyle={{ backgroundColor: '#999999', height: 17 }}z
                  />
                </SliderWrap>
                <RaisedInfoWrap>
                  <RaisedValue>
                    {bondPrice * bondsSold} UST
                    {/*${round(countBoughtTokens * salePriceBound, 2)}*/}
                  </RaisedValue>
                  raised so far
                </RaisedInfoWrap>
                <PricePerNFT>
                  Price Per NFT
                </PricePerNFT>
                <MintedWrap>
                  <MintedCount>
                    {bondsPurchased} of {bondsOwnershipLimit} Minted
                  </MintedCount>
                  <MintedPrice>
                    {bondPrice} UST Each
                  </MintedPrice>
                </MintedWrap>
                <LockupWrap>
                  <LockupBorder />
                  <LockupinfoNormal>
                    Minted bonds during IBO will remain inactive until the official launch of the platform,
                    at which point you will have an option to activate your bonds with a linear vesting period of 7 days.
                  </LockupinfoNormal>
                </LockupWrap>
                <MintButtonWrap>
                  {connected ?
                    <>
                      {loadingTransaction ?
                        <CircularProgressWrap>
                          <CircularProgress />
                        </CircularProgressWrap>
                        :
                        <>
                          {!hasAllowance ?
                            <ButtonMint
                              variant="contained"
                              color="primary"
                              onClick={getApprove}>
                              Approve
                            </ButtonMint>
                            :
                            <ButtonMint
                              variant="contained"
                              color="primary"
                              onClick={onMintClick}>
                              Mint Bond
                            </ButtonMint>
                          }
                        </>
                      }
                    </>
                    :
                    <ButtonMint
                      variant="contained"
                      color="primary"
                      onClick={connectNetwork}>
                      Connect Wallet
                    </ButtonMint>
                  }
                </MintButtonWrap>
              </MintBlock>
              <BondsNFTWrap>
                {/*<img src={BondsOne} alt="" />*/}
                {/*<img src={BondsTwo} alt="" />*/}
                {/*<img src={BondsThree} alt="" />*/}
                <Slots></Slots>
              </BondsNFTWrap>
            </MintWrap>
          </Grid>
        </Paper>
      </Zoom>
      <InfoWrap>
        <MyBonds />
        <InitialBondInfo />
      </InfoWrap>
      <CommunityInfoWrap>
        <CommunityInfo />
      </CommunityInfoWrap>
    </div>
  );
}

const IBOTitle = styled.div`
  font-weight: bold;
  font-size: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.25px;
  color: #FFFFFF;
  margin-top: 10px;
  margin-bottom: 40px;
`;

const TokensInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const TokensBoughtWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TokensBought = styled.div`
  font-weight: 700;
  font-size: 25px;
  line-height: 31px;
  color: #FFFFFF;
  @media ${screenMaxSize.sm} {
    font-size: 16px;
  }
`;

const TokensCount = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
  text-align: right;
  @media ${screenMaxSize.sm} {
    font-size: 16px;
  }
`;

const TokensLogo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 14px;
  @media ${screenMaxSize.sm} {
    margin-right: 10px;
  }
  svg {
    height: 46px;
    //width: 41px;
    @media ${screenMaxSize.sm} {
      height: 38px;
      width: 39px;
    }
  }
`;

const SliderWrap = styled.div`
  margin-bottom: 20px;
  
  .rc-slider {
    height: 17px;
  }
  .rc-slider-handle {
    display: none;
  }

  .rc-slider-rail, .rc-slider-track {
    border-radius: 0px;
  }
`;

const RaisedInfoWrap = styled.div`
  font-size: 18px;
  color: #B0B0B0;
  margin-bottom: 25px;
  font-weight: 400;
  @media ${screenMaxSize.sm} {
    font-size: 20px;
  }
`;

const RaisedValue = styled.span`
  color: #ffffff;
  font-size: 20px;
  margin-right: 6px;
`;


const PricePerNFT = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 10px;
  display: flex;
  align-items: center;
  justify-content: right;
  letter-spacing: 0.25px;
  color: #FFFFFF;
  margin-bottom: 10px;
`;

const MintedWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
`;

const MintedCount = styled.div`
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const MintedPrice = styled.div`
  font-size: 19px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const LockupWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const LockupBorder = styled.div`
  width: 8px;
  height: auto;
  margin-right: 8px;
  background: #F3C980;
`;


export default SolaarIBO;
