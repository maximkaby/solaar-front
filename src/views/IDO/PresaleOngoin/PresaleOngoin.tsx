import React from 'react';
import styled from 'styled-components';
import PresaleTimer from "../PresaleTimer/PresaleTimer";
import PresaleBuyTokens from "./PresaleBuyTokens";
import PresaleWhiteInfo from "./PresaleWhiteInfo";
import { screenMaxSize } from "src/themes/global";
import { useIDOContextData } from "../IDOContext";
import { format, compareAsc } from 'date-fns'

const PresaleInfoWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 100px;
`;

const Title = styled.div`
  font-style: normal;
  font-size: 53.2345px;
  line-height: 54px;
  font-weight: 700;
  /* identical to box height, or 101% */

  letter-spacing: -0.04em;

  color: rgba(10, 37, 51, 0.98);
  margin-bottom: 18px;
  
  @media ${screenMaxSize.sm} {
    font-size: 40px;
    text-align: center;
  }
`;

const SubTitle = styled.div`
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  color: #0A2533;
  margin-bottom: 30px;
`;

const TimerWrap = styled.div`
  margin-bottom: 15px;
`;

const TimeLeftText = styled.div`
  margin-bottom: 25px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  color: #5B717C;
  @media ${screenMaxSize.sm} {
    font-size: 20px;
  }
`;




const PresaleOngoin = () => {
  const {
    startOfSaleTime,
    endOfSaleTime,
  } = useIDOContextData();
  const startDate = new Date(Date.UTC(2022, 0, 5, 13));
  const endDate = new Date(Date.UTC(2022, 0, 7, 13));
  const startDateFormatted = format(startDate, 'MMM d,  yyyy H:mm O');
  const endDateFormatted = format(endDate, 'MMM d,  yyyy H:mm O');

  let date  = startDate > new Date() ? startDate : endDate;
  return (
    <PresaleInfoWrap>
      <Title>
        SOLR DAO Presale
      </Title>
      <SubTitle>
        The IDO will be held from {startDateFormatted} to {endDateFormatted}. <br/>
        Plant trees right now!
      </SubTitle>
      <TimerWrap>
        <PresaleTimer endTime={date}/>
      </TimerWrap>
      <TimeLeftText>
        {startDate > new Date() ?
          'Time left till the beginning of the presale.'
          : 'Time left till the end of presale'
        }
      </TimeLeftText>
      <PresaleBuyTokens />
      <PresaleWhiteInfo />
    </PresaleInfoWrap>
  );
}

export default PresaleOngoin;