import React from 'react';
import styled from 'styled-components';
import { getBondsCountString } from "src/helpers";

const BondsLeftWrap = styled.div`
  margin-bottom: 38px;
`;

const NumberContainer = styled.div`
  width: 70px;
  height: 70px;
  font-weight: 500;
  font-size: 30px;
  line-height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.25px;
  border: 1px solid #565656;
  box-sizing: border-box;
  border-radius: 4px;
  color: #FFFFFF;
`;

const NumbersWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  & > div {
    margin-right: 5.6px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Description = styled.div`
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const BondsLeft = ({ count = 0 }: any) => {
  return (
    <BondsLeftWrap>
      <NumbersWrap>
        {getBondsCountString(count).split('').map((value: string) => {
          return (
            <NumberContainer>
              {value}
            </NumberContainer>
          );
        })}
      </NumbersWrap>
      <Description>
        Bonds Left Available for Minting
      </Description>
    </BondsLeftWrap>
  )
}

export default BondsLeft;