import React from 'react';
import styled from 'styled-components';
import { screenMaxSize } from 'src/themes/global'

const StatItemWrap = styled.div`
  @media ${screenMaxSize.sm} {
    text-align: center;
    margin-bottom: 10px;
  }
`;

const StatTitle = styled.div`
  font-weight: 500;
  font-size: 21.391px;
  line-height: 36px;
  font-family: 'Baloo Bhaina 2', cursive;
  /* Fonts/Primary */

  color: #00C07C;
`;

const StatValue = styled.div`
  font-weight: 600;
  font-size: 33.9739px;
  line-height: 34px;

  color: #FFFFFF;
`;



const StatItem = ({ title, value }: any) => {
  return (
    <StatItemWrap>
      <StatTitle>
        {title}
      </StatTitle>
      <StatValue>
        {value}
      </StatValue>
    </StatItemWrap>
  );
}

export default StatItem;