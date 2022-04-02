import React, { useEffect, useState } from "react";
import "./calculator.scss";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Context } from "src/hooks";
import {
  Grid, InputAdornment, TextField,
  OutlinedInput, Zoom, Slider,
  Paper, FormControl, InputLabel
} from "@material-ui/core";
import { trim } from "../../helpers";
import { Skeleton } from "@material-ui/lab";
import { TOKEN_NAME } from "src/constants";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const PrettoSlider = withStyles({
  root: {
    color: '#F3C980',
    height: 8,
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: '#F3C980',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: '-7px!important',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  rail: {
    height: 2,
    borderRadius: 1
  },
})(Slider);

function Calculator() {
  const isAppLoading = useSelector(state => state.app.loading);
  const marketPrice = useSelector(state => {
    return state.app.marketPrice;
  });
  const stakingAPY = useSelector(state => {
    return state.app.stakingAPY;
  });
  const memoBalance = useSelector(state => {
    return state.account.balances && state.account.balances.sohm;
  });

  const trimmedStakingAPY = trim(stakingAPY * 100, 1);
  const trimmedMemoBalance = trim(Number(memoBalance), 6);
  const trimeMarketPrice = trim(marketPrice, 2);

  const [memoAmount, setMemoAmount] = useState(trimmedMemoBalance);
  const [rewardYield, setRewardYield] = useState(trimmedStakingAPY);
  const [priceAtPurchase, setPriceAtPurchase] = useState(trimeMarketPrice);
  const [futureMarketPrice, setFutureMarketPrice] = useState(trimeMarketPrice);
  const [days, setDays] = useState(30);

  const [rewardsEstimation, setRewardsEstimation] = useState("0");
  const [potentialReturn, setPotentialReturn] = useState("0");
  const isVerySmallScreen = useMediaQuery("(max-width: 596px)");

  const calcInitialInvestment = () => {
    const memo = Number(memoAmount) || 0;
    const price = parseFloat(priceAtPurchase) || 0;
    const amount = memo * price;
    return trim(amount, 2);
  };

  const calcCurrentWealth = () => {
    const memo = Number(memoAmount) || 0;
    const price = parseFloat(trimeMarketPrice);
    const amount = memo * price;
    return trim(amount, 2);
  };

  const [initialInvestment, setInitialInvestment] = useState(calcInitialInvestment());

  useEffect(() => {
    const newInitialInvestment = calcInitialInvestment();
    setInitialInvestment(newInitialInvestment);
  }, [memoAmount, priceAtPurchase]);

  const calcNewBalance = () => {
    let value = parseFloat(rewardYield) / 100;
    value = Math.pow(value - 1, 1 / (365 * 3)) - 1 || 0;
    let balance = Number(memoAmount);
    for (let i = 0; i < days * 3; i++) {
      balance += balance * value;
    }
    return balance;
  };

  useEffect(() => {
    const newBalance = calcNewBalance();
    setRewardsEstimation(trim(newBalance, 6));
    const newPotentialReturn = newBalance * (parseFloat(futureMarketPrice) || 0);
    setPotentialReturn(trim(newPotentialReturn, 2));
  }, [days, rewardYield, futureMarketPrice, memoAmount]);

  return (
    <div className="calculator-view">
      <Zoom in={true}>
        <Paper className="calculator-card">
          <Grid className="calculator-card-grid" container direction="column" spacing={2}>
            <Grid item>
              <div className="calculator-card-header">
                <p className="calculator-card-header-title">Calculator</p>
                <p className="calculator-card-header-subtitle">Estimate your returns</p>
              </div>
            </Grid>
            <Grid item>
              <div className="calculator-card-metrics">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="calculator-card-apy">
                      <p className="calculator-card-metrics-title">{TOKEN_NAME} Price</p>
                      <p className="calculator-card-metrics-value">{isAppLoading ? <Skeleton width="100px" /> : `$${trimeMarketPrice}`}</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="calculator-card-tvl">
                      <p className="calculator-card-metrics-title">Current APY</p>
                      <p className="calculator-card-metrics-value">
                        {isAppLoading ? <Skeleton width="100px" /> : <>{new Intl.NumberFormat("en-US").format(Number(trimmedStakingAPY))}%</>}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="calculator-card-index">
                      <p className="calculator-card-metrics-title">Your s{TOKEN_NAME} Balance</p>
                      <p className="calculator-card-metrics-value">
                        {isAppLoading ? <Skeleton width="100px" /> : <>{trimmedMemoBalance} s{TOKEN_NAME}</>}
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>

            <div className="calculator-card-area">
              <div className="calculator-card-action-area">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <div className="calculator-card-action-area-inp-wrap">
                      <TextField
                        variant="outlined"
                        type="number"
                        label="sSOLR Amount"
                        value={memoAmount}
                        onChange={e => setMemoAmount(e.target.value)}
                        InputProps={{
                          endAdornment:
                            <InputAdornment position="end">
                              <div onClick={() => setMemoAmount(trimmedMemoBalance)} className="stake-card-action-input-btn">
                                <p>Max</p>
                              </div>
                            </InputAdornment>
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="calculator-card-action-area-inp-wrap">
                      <TextField
                        type="number"
                        label="APY (%)"
                        variant="outlined"
                        placeholder="Amount"
                        value={rewardYield}
                        onChange={e => setRewardYield(e.target.value)}
                        InputProps={{
                          endAdornment:
                            <InputAdornment position="end">
                              <div onClick={() => setRewardYield(trimmedStakingAPY)} className="stake-card-action-input-btn">
                                <p>Current</p>
                              </div>
                            </InputAdornment>
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="calculator-card-action-area-inp-wrap">
                      <p className="calculator-card-action-area-inp-wrap-title"></p>
                      <TextField
                        type="number"
                        variant="outlined"
                        label={`${TOKEN_NAME} price at purchase ($)`}
                        placeholder="Amount"
                        value={priceAtPurchase}
                        onChange={e => setPriceAtPurchase(e.target.value)}
                        InputProps={{
                          endAdornment:
                            <InputAdornment position="end">
                              <div onClick={() => setPriceAtPurchase(trimeMarketPrice)} className="stake-card-action-input-btn">
                                <p>Current</p>
                              </div>
                            </InputAdornment>
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="calculator-card-action-area-inp-wrap">
                      <TextField
                        type="number"
                        variant="outlined"
                        placeholder="Amount"
                        label={`Future ${TOKEN_NAME} market price ($)`}
                        value={futureMarketPrice}
                        onChange={e => setFutureMarketPrice(e.target.value)}
                        InputProps={{
                          endAdornment:
                            <InputAdornment position="end">
                              <div onClick={() => setFutureMarketPrice(trimeMarketPrice)} className="stake-card-action-input-btn">
                                <p>Current</p>
                              </div>
                            </InputAdornment>
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="calculator-days-slider-wrap">
                <p className="calculator-days-slider-wrap-title">{`${days} day${days > 1 ? "s" : ""}`}</p>
                <PrettoSlider
                  className="calculator-days-slider1"
                  orientation={isVerySmallScreen ? 'horizontal' : 'vertical'}
                  min={1}
                  max={365}
                  value={days}
                  onChange={(e, newValue: any) => setDays(newValue)}
                />
              </div>
              <div className="calculator-user-data">
                <div className="data-row">
                  <p className="data-row-name">Your initial investment</p>
                  <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>${initialInvestment}</>}</p>
                </div>
                <div className="data-row">
                  <p className="data-row-name">Current wealth</p>
                  <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>${calcCurrentWealth()}</>}</p>
                </div>
                <div className="data-row">
                  <p className="data-row-name">{TOKEN_NAME} rewards estimation</p>
                  <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{rewardsEstimation} {TOKEN_NAME}</>}</p>
                </div>
                <div className="data-row">
                  <p className="data-row-name">Potential return</p>
                  <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>${potentialReturn}</>}</p>
                </div>
              </div>
            </div>
          </Grid>
        </Paper>
      </Zoom>
    </div>
  );
}

export default Calculator;
