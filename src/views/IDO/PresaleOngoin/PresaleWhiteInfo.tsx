import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TimeLeft } from "src/assets/icons/time-left.svg";
import { screenMaxSize } from "src/themes/global";
import { useIDOContextData } from "../IDOContext";

const PresaleWhiteInfoWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 691px;
  padding: 22px;
  background-color: #fff;
  border-radius: 20px;
  @media ${screenMaxSize.sm} {
    width: 100%;
  }
`;

const TimeLeftWrap = styled.div`
  margin-bottom: 18px;
  height: 81px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #042D3A;
  margin-bottom: 10px;
`;

const SubTitle = styled.div`
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: #0A2533;
  margin-bottom: 20px;
`;

const PresaleWhiteInfo = () => {
  const {
    endOfWLSaleTime: endOfWLSale
  } = useIDOContextData();
  console.log(endOfWLSale, 'endOfWLSale');
  return (
    <PresaleWhiteInfoWrap>
      <TimeLeftWrap>
        <TimeLeft></TimeLeft>
      </TimeLeftWrap>
      <Title>
        {endOfWLSale > new Date() ?
          'Open to whitelisted humans only'
          : 'Open to every human'
        }
      </Title>
      <SubTitle>
        {endOfWLSale > new Date() ?
          <span>Whitelisted humans have preferential rights to join this presale. No more than <b>200</b> GAIA will be sold to a single wallet. You can make several purchases</span>
          : <span>All humans, including whitelisted ones, are able to buy GAIA now. No more than <b>200</b> GAIA will be sold to a single wallet. You can make several purchases</span>
        }
      </SubTitle>
    </PresaleWhiteInfoWrap>
  )
}

export default PresaleWhiteInfo;