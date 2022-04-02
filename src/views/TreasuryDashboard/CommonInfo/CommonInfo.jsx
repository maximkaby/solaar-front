import React from 'react';
import styled from "styled-components";
import { Skeleton } from "@material-ui/lab";
import { TOKEN_NAME } from "src/constants";
import { formatCurrency } from "src/helpers";
import InfoTooltip from "src/components/InfoTooltip/InfoTooltip";

const CommonInfoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 26px 26px 2px;
  background: #202226CC;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const MetricWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(100% / 3);
`;


const MetricValue = styled.div`
  color: #FFFFFF;
  font-weight: 600;
  font-size: 20px;
  line-height: 10px;
  text-align: center;
  letter-spacing: 0.25px;
  &:nth-of-type(-n + 3) {
    margin-bottom: 30px;
  }
`;

const MetricTitle = styled.div`
  margin-bottom: 15px;
  color: #999999;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.25px;
`;

export const Metric = (props: any) =>
  <MetricWrap className={`metric ${props.className}`}>{props.children}</MetricWrap>;

Metric.Value = (props: any) =>
  <MetricValue>{props.children || <Skeleton type="text" />}</MetricValue>;

Metric.Title = (props: any) => (
  <MetricTitle>
    {props.children}
  </MetricTitle>
);

const CommonInfo = () => {
  return (
    <CommonInfoWrap>
      <Metric>
        <Metric.Title>Market Cap</Metric.Title>
        <Metric.Value>$0</Metric.Value>
      </Metric>
      <Metric>
        <Metric.Title>SOLR Price</Metric.Title>
        <Metric.Value>$0</Metric.Value>
      </Metric>
      <Metric>
        <Metric.Title>
          gSOLR Price
          <InfoTooltip
            message={`The current index tracks the amount of s${TOKEN_NAME} accumulated since the beginning of staking. Basically, how much s${TOKEN_NAME} one would have if they staked and held a single ${TOKEN_NAME} from day 1.`}
          />
        </Metric.Title>
        <Metric.Value>$0</Metric.Value>
      </Metric>
      <Metric>
        <Metric.Title>Circulating Supply (total)</Metric.Title>
        <Metric.Value>0 / 1000000</Metric.Value>
      </Metric>
      <Metric>
        <Metric.Title>Backing per SOLR</Metric.Title>
        <Metric.Value>$0</Metric.Value>
      </Metric>
      <Metric>
        <Metric.Title>
          Current Index
          <InfoTooltip
            message={`The current index tracks the amount of s${TOKEN_NAME} accumulated since the beginning of staking. Basically, how much s${TOKEN_NAME} one would have if they staked and held a single ${TOKEN_NAME} from day 1.`}
          />
        </Metric.Title>
        <Metric.Value>0 sSOLR</Metric.Value>
      </Metric>
    </CommonInfoWrap>
  );
}

export default CommonInfo;