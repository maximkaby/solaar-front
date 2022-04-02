import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t, Trans } from "@lingui/macro";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
  Typography,
} from "@material-ui/core";
import { prettifySeconds, secondsUntilBlock, shorten, trim } from "../../helpers";
import { bondAsset, calcBondDetails, changeApproval } from "../../slices/BondSlice";
import { useWeb3Context } from "src/hooks/web3Context";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { Skeleton } from "@material-ui/lab";
import useDebounce from "../../hooks/Debounce";
import { error } from "../../slices/MessagesSlice";
import { DisplayBondDiscount } from "./Bond";
import ConnectButton from "../../components/ConnectButton";
import { TOKEN_NAME, BOND_POINTS } from "src/constants";
import SliderRange from "../../components/SliderRange/SliderRange";
import Lockupinfo from "src/components/LockupInfo/LockupInfo";
import styled from "styled-components";
import { screenMaxSize } from "../../themes/global";


const LockupBorder = styled.div`
  width: 14px;
  height: auto;
  margin-right: 13px;
  background: #F3C980;
`;

const FormWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  @media ${screenMaxSize.sm} {
    flex-direction: column;
    justify-content: center;
  }
`;

function BondPurchase({ bond, slippage, recipientAddress }) {
  const SECONDS_TO_REFRESH = 60;
  const dispatch = useDispatch();
  const { provider, address, chainID } = useWeb3Context();

  const [quantity, setQuantity] = useState("");
  const [secondsToRefresh, setSecondsToRefresh] = useState(SECONDS_TO_REFRESH);

  const currentBlock = useSelector(state => {
    return state.app.currentBlock;
  });

  const isBondLoading = useSelector(state => state.bonding.loading ?? true);

  const pendingTransactions = useSelector(state => {
    return state.pendingTransactions;
  });

  const vestingPeriod = () => {
    return prettifySeconds(bond.vestingTerm, "day");
  };

  async function onBond() {
    if (quantity === "") {
      dispatch(error(t`Please enter a value!`));
    } else if (isNaN(quantity)) {
      dispatch(error(t`Please enter a valid value!`));
    } else if (bond.interestDue > 0 || bond.pendingPayout > 0) {
      const shouldProceed = window.confirm(
        t`You have an existing bond. Bonding will reset
          your vesting period and forfeit rewards.
          We recommend claiming rewards first or
          using a fresh wallet. Do you still want to proceed?
         `,
      );
      if (shouldProceed) {
        await dispatch(
          bondAsset({
            value: quantity,
            slippage,
            bond,
            networkID: chainID,
            provider,
            address: recipientAddress || address,
          }),
        );
      }
    } else {
      await dispatch(
        bondAsset({
          value: quantity,
          slippage,
          bond,
          networkID: chainID,
          provider,
          address: recipientAddress || address,
        }),
      );
      clearInput();
    }
  }

  const clearInput = () => {
    setQuantity(0);
  };

  const hasAllowance = useCallback(() => {
    return bond.allowance > 0;
  }, [bond.allowance]);

  const setMax = () => {
    let maxQ;
    if (bond.maxBondPrice * bond.bondPrice < Number(bond.balance)) {
      // there is precision loss here on Number(bond.balance)
      maxQ = bond.maxBondPrice * bond.bondPrice.toString();
    } else {
      maxQ = bond.balance;
    }
    setQuantity(maxQ);
  };

  const bondDetailsDebounce = useDebounce(quantity, 1000);

  useEffect(() => {
    dispatch(calcBondDetails({ bond, value: quantity, provider, networkID: chainID }));
  }, [bondDetailsDebounce]);

  useEffect(() => {
    let interval = null;
    if (secondsToRefresh > 0) {
      interval = setInterval(() => {
        setSecondsToRefresh(secondsToRefresh => secondsToRefresh - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      dispatch(calcBondDetails({ bond, value: quantity, provider, networkID: chainID }));
      setSecondsToRefresh(SECONDS_TO_REFRESH);
    }
    return () => clearInterval(interval);
  }, [secondsToRefresh, quantity]);

  const onSeekApproval = async () => {
    dispatch(changeApproval({ address, bond, provider, networkID: chainID }));
  };

  const displayUnits = bond.displayUnits;

  const isAllowanceDataLoading = bond.allowance == null;

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" justifyContent="space-around" flexWrap="wrap">
        <Box display="flex" marginBottom="10px">
          <LockupBorder />
          <Lockupinfo>
            The longer the vesting period you choose, the <br/>
            higher the discount you receive.
          </Lockupinfo>
        </Box>
        <SliderRange
          pointsToShow={BOND_POINTS}
          marks={BOND_POINTS}
          title="Vesting term"
        />
        <FormWrapper>
          {!address ? (
            <ConnectButton />
          ) : (
            <>
              {isAllowanceDataLoading ? (
                <Skeleton width="200px" />
              ) : (
                <>
                  {!hasAllowance() ? (
                    <div className="help-text">
                      <em>
                        <Typography variant="body1" align="center" color="textSecondary">
                          <Trans>First time bonding</Trans> <b>{bond.displayName}</b>? <br />{" "}
                          <Trans>Please approve SOLR DAO to use your</Trans> <b>{bond.displayName}</b>{" "}
                          <Trans>for bonding</Trans>.
                        </Typography>
                      </em>
                    </div>
                  ) : (
                    <FormControl className="ohm-input" variant="outlined" color="primary" fullWidth>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        <Trans>Amount</Trans>
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        labelWidth={55}
                        endAdornment={
                          <InputAdornment position="end">
                            <Button variant="text" onClick={setMax}>
                              <Trans>Max</Trans>
                            </Button>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  )}
                  {!bond.isAvailable[chainID] ? (
                    <Button
                      variant="contained"
                      color="primary"
                      id="bond-btn"
                      className="transaction-button"
                      disabled={true}
                    >
                      <Trans>Sold Out</Trans>
                    </Button>
                  ) : hasAllowance() ? (
                    <Button
                      variant="contained"
                      color="primary"
                      id="bond-btn"
                      className="transaction-button"
                      disabled={isPendingTxn(pendingTransactions, "bond_" + bond.name)}
                      onClick={onBond}
                    >
                      {txnButtonText(pendingTransactions, "bond_" + bond.name, "Bond")}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      id="bond-approve-btn"
                      className="transaction-button"
                      disabled={isPendingTxn(pendingTransactions, "approve_" + bond.name)}
                      onClick={onSeekApproval}
                    >
                      {txnButtonText(pendingTransactions, "approve_" + bond.name, "Approve")}
                    </Button>
                  )}
                </>
              )}{" "}
            </>
          )}
        </FormWrapper>
      </Box>

      <Slide direction="left" in={true} mountOnEnter unmountOnExit {...{ timeout: 533 }}>
        <Box className="bond-data">
          <div className="data-row">
            <Typography>
              <Trans>Your Balance</Trans>
            </Typography>{" "}
            <Typography id="bond-balance">
              {isBondLoading ? (
                <Skeleton width="100px" />
              ) : (
                <>
                  {trim(bond.balance, 4)} {displayUnits}
                </>
              )}
            </Typography>
          </div>

          <div className={`data-row`}>
            <Typography>
              <Trans>You Will Get</Trans>
            </Typography>
            <Typography id="bond-value-id" className="price-data">
              {isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.bondQuote, 4) || "0"} ${TOKEN_NAME}`}
            </Typography>
          </div>

          <div className={`data-row`}>
            <Typography>
              <Trans>Max You Can Buy</Trans>
            </Typography>
            <Typography id="bond-value-id" className="price-data">
              {isBondLoading ?
                <Skeleton width="100px" />
                : `${trim(bond.maxBondPrice, 4) || "0"} ${TOKEN_NAME}`
              }
            </Typography>
          </div>

          <div className="data-row">
            <Typography>
              <Trans>ROI</Trans>
            </Typography>
            <Typography>
              {isBondLoading ?
                <Skeleton width="100px" />
                : <DisplayBondDiscount key={bond.name} bond={bond} />
              }
            </Typography>
          </div>

          <div className="data-row">
            <Typography>
              <Trans>Debt Ratio</Trans>
            </Typography>
            <Typography>
              {isBondLoading ?
                <Skeleton width="100px" />
                : `${trim(bond.debtRatio / 10000000, 2)}%`}
            </Typography>
          </div>

          <div className="data-row">
            <Typography>
              <Trans>Vesting Term</Trans>
            </Typography>
            <Typography>
              {isBondLoading ? <Skeleton width="100px" /> : vestingPeriod()}
            </Typography>
          </div>

          {recipientAddress !== address && (
            <div className="data-row">
              <Typography>
                <Trans>Recipient</Trans>{" "}
              </Typography>
              <Typography>
                {isBondLoading ? <Skeleton width="100px" /> : shorten(recipientAddress)}
              </Typography>
            </div>
          )}
        </Box>
      </Slide>
    </Box>
  );
}

export default BondPurchase;