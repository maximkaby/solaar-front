import React, { useState, useEffect } from 'react'
import TimerCell from "./TimerCell";
import styled from 'styled-components';
import { useIDOContract } from "../hooks";
import { useIDOContextData } from "../IDOContext";
import { screenMaxSize } from "src/themes/global";

const TimerCellsWrap = styled.div`
  display: flex;
`;

const TimerCellGroup = styled.div`
  display: flex;
  & > div:nth-of-type(1) {
    margin-right: 5px;
  }
`;

const TimeDivider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div:nth-of-type(1) {
    margin-bottom: 5px;
  }
`;

const TimeDot = styled.div`
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: #00C07C;
  margin: 0 10px;
  @media ${screenMaxSize.sm} {
    margin: 0 6px;
  }
`;

const roundTimeTwoValues = (value: string) => {
  if (value.split('').length < 2) {
    return `0${value}`;
  }
  return value;
}

const PresaleTimer = ({ endTime = {} }: any) => {
  const { endOfSaleTime } = useIDOContextData();
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeFormatted, setTimeFormatted] = useState({
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  });

  useEffect(() => {
    let date = endTime.valueOf() - new Date().valueOf();
    setTimeLeft(date);
  }, [endOfSaleTime]);


  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      setTimeFormatted({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      });
    };

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(time => {
        const newTime = time - 1000 * 2;
        if (newTime < 0) {
          setTimeFormatted({
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00'
          });
          setTimeLeft(0);
          return newTime;
        }

        let date = new Date(newTime);
        date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        const days = roundTimeTwoValues(String(date.getDate() - 1));
        const hours = roundTimeTwoValues(String(date.getHours()));
        const minutes = roundTimeTwoValues(String(date.getMinutes()));
        const seconds = roundTimeTwoValues(String(date.getSeconds()));
        setTimeFormatted({
          days,
          hours,
          minutes,
          seconds
        });
        return newTime;
      });
    }, 1000 * 2);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TimerCellsWrap>
      <TimerCellGroup>
        <TimerCell value={timeFormatted.days[0]}></TimerCell>
        <TimerCell value={timeFormatted.days[1]}></TimerCell>
      </TimerCellGroup>
      <TimeDivider>
        <TimeDot />
        <TimeDot />
      </TimeDivider>
      <TimerCellGroup>
        <TimerCell value={timeFormatted.hours[0]}></TimerCell>
        <TimerCell value={timeFormatted.hours[1]}></TimerCell>
      </TimerCellGroup>
      <TimeDivider>
        <TimeDot />
        <TimeDot />
      </TimeDivider>
      <TimerCellGroup>
        <TimerCell value={timeFormatted.minutes[0]} />
        <TimerCell value={timeFormatted.minutes[1]} />
      </TimerCellGroup>
      {/*<TimeDivider>*/}
      {/*  <TimeDot />*/}
      {/*  <TimeDot />*/}
      {/*</TimeDivider>*/}
      {/*<TimerCellGroup>*/}
      {/*  <TimerCell value={timeFormatted.seconds[0]} />*/}
      {/*  <TimerCell value={timeFormatted.seconds[1]} />*/}
      {/*</TimerCellGroup>*/}
    </TimerCellsWrap>
  );
};

export default PresaleTimer;