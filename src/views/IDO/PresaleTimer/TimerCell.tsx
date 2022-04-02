import React from 'react';
import styled from 'styled-components';

const TimerCellWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 51px;
  height: 56px;
  background: #FFFFFF;
  border-radius: 11px;
  color: #00C07C;
`;

const Time = styled.div`
  position: relative;
  top: 4px;
  left: 1px;
  height: 27px;
  display: flex;
  align-items: center;
  font-size: 29px;
  font-weight: 700;
`;

const TimerCell = ({ value }: any) => {
  return (
    <TimerCellWrap>
      <Time>
        {value}
      </Time>
    </TimerCellWrap>
  )
};

export default TimerCell;