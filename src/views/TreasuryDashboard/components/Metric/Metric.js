import { useSelector } from "react-redux";
import { Skeleton } from "@material-ui/lab";
import { Typography, Box } from "@material-ui/core";
import { trim, formatCurrency } from "src/helpers";
import InfoTooltip from "src/components/InfoTooltip/InfoTooltip.jsx";
import { TOKEN_NAME } from "src/constants";
import styled from 'styled-components';
import { round } from "lodash";
import { useAppSelector } from "src/hooks";
import { allBondsMap } from "src/helpers/AllBonds";

const MetricWrap = styled.div`
  background: #FFFFFF;
  padding: 20px 21px 39px;
  border-radius: 11px;
  background: #202226;
  opacity: 0.8;
`;

const MetricTitle = styled.div`
  margin-bottom: 8px;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: 0.25px;
  font-weight: 500;
  color: #999999;
  text-align: left;
`;

const MetricValue = styled.div`
  text-align: left;
  font-weight: bold;
  font-size: 22px;
  color: #fff;
  letter-spacing: 0.25px;
  span {
    font-weight: 400;
    color: #999999;
  }
`;

export const Metric = props =>
  <MetricWrap className={`metric ${props.className}`}>{props.children}</MetricWrap>;

Metric.Value = props =>
  <MetricValue>{props.children || <Skeleton type="text" />}</MetricValue>;

Metric.Title = props => (
  <MetricTitle>
    {props.children}
  </MetricTitle>
);

export const MarketCap = () => {
  const marketCap = useSelector(state => state.app.marketCap);

  return (
    <Metric className="market">
      <Metric.Title>Total Value Deposited</Metric.Title>
      {/*<Metric.Value>{marketCap && formatCurrency(marketCap, 0)}</Metric.Value>*/}
      <Metric.Value>$0 <span>Today</span></Metric.Value>
    </Metric>
  );
};

export const OHMPrice = () => {
  const marketPrice = useSelector(state => state.app.marketPrice);

  return (
    <Metric className="price">
      <Metric.Title>Market Value of Treasury Assets</Metric.Title>
      {/*<Metric.Value>{marketPrice && formatCurrency(marketPrice, 2)}</Metric.Value>*/}
      <Metric.Value>$0 <span>Today</span></Metric.Value>
    </Metric>
  );
};

export const CircSupply = () => {
  const circSupply = useSelector(state => state.app.circSupply);
  const totalSupply = useSelector(state => state.app.totalSupply);

  const isDataLoaded = circSupply && totalSupply;

  return (
    <Metric className="circ">
      <Metric.Title>Risk Free Value of Treasury Assets</Metric.Title>
      {/*<Metric.Value>{isDataLoaded && parseInt(circSupply)}</Metric.Value>*/}
      <Metric.Value>$0 <span>Today</span></Metric.Value>
    </Metric>
  );
};

export const StakingAPY = () => {
  const stakingAPY = useSelector(state => state.app.stakingAPY);
  let trimmedStakingAPY;
  if (stakingAPY > Math.pow(10, 18)) {
    trimmedStakingAPY = 'Huge';
  } else {
    trimmedStakingAPY = new Intl.NumberFormat("en-US")
      .format(trim(stakingAPY * 100, 1));
  }
  return (
    <Metric className="circ">
      <Metric.Title>Protocol Owned Liquidity SOLR-UST</Metric.Title>
      {/*<Metric.Value>*/}
      {/*  {stakingAPY &&*/}
      {/*    `${trimmedStakingAPY}%`*/}
      {/*  }*/}
      {/*</Metric.Value>*/}
      <Metric.Value>
        100% <span>Today</span>
      </Metric.Value>
    </Metric>
  );
};

export const BackingPerOHM = () => {
  const circSupply = useSelector(state => state.app.circSupply);
  const treasuryBalance = useAppSelector(state => {
    if (state.bonding.loading == false) {
      let tokenBalances = 0;
      for (const bond in allBondsMap) {
        if (state.bonding[bond]) {
          tokenBalances += state.bonding[bond].purchased;
        }
      }
      return tokenBalances;
    }
  });
  const isDataLoaded = treasuryBalance && circSupply;

  console.log(treasuryBalance, 'treasuryBalance BackingPerOHM');
  return (
    <Metric className="bpo">
      <Metric.Title>SOLR Staked</Metric.Title>
      {/*<Metric.Value>{isDataLoaded && formatCurrency(treasuryBalance / circSupply, 2)}</Metric.Value>*/}
      <Metric.Value>0% <span>Today</span></Metric.Value>
    </Metric>
  );
};

export const CurrentIndex = () => {
  const currentIndex = useSelector(state => state.app.currentIndex);

  return (
    <Metric className="index">
      <Metric.Title>
        Runway Available
      </Metric.Title>
      {/*<Metric.Value>{currentIndex && trim(currentIndex, 2) + ` s${TOKEN_NAME}`}</Metric.Value>*/}
      <Metric.Value>0 Days</Metric.Value>
    </Metric>
  );
};

export const TVL = () => {
  const stakingTVL = useAppSelector(state => {
    return state.app.stakingTVL;
  });

  return (
    <Metric className="index">
      <Metric.Title>
        TVL
      </Metric.Title>
      <Metric.Value>{stakingTVL &&
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(stakingTVL)}
      </Metric.Value>
    </Metric>
  );
};

export const TreasuryBalance = () => {
  const treasuryBalance = useAppSelector(state => {
    if (state.bonding.loading == false) {
      let tokenBalances = 0;
      for (const bond in allBondsMap) {
        if (state.bonding[bond]) {
          tokenBalances += state.bonding[bond].purchased;
        }
      }
      return tokenBalances;
    }
  });

  return (
    <Metric className="index">
      <Metric.Title>
        Treasury Balance
      </Metric.Title>
      <Metric.Value>{treasuryBalance &&
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(treasuryBalance)}
      </Metric.Value>
    </Metric>
  );
};

export const FiveDaysStaked = () => {
  const fiveDayRate = useAppSelector(state => {
    return state.app.fiveDayRate;
  });

  return (
    <Metric className="index">
      <Metric.Title>
        5-Day Staking ROI
      </Metric.Title>
      <Metric.Value>{fiveDayRate &&
        `${new Intl.NumberFormat("en-US")
          .format(trim(fiveDayRate * 100, 1))}%`}
      </Metric.Value>
    </Metric>
  );
};

