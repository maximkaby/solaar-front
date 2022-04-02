import React, { useMemo, useState } from 'react';
import Slider from "rc-slider";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';

const SliderRangeWrap = styled.div`
  margin-bottom: 57px;
  .rc-slider-handle:active {
    box-shadow: none;
  }
`;

const Round = styled.div`
  width: 16px;
  height: 16px;
  background: #A8A8A8;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.75);
  border-radius: 50%;
  margin-bottom: 10px;
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
`;

const Title = styled.div`
  font-size: 14px;
  line-height: 10px;
  letter-spacing: 0.25px;
  font-weight: 700;
`;

const TextFieldWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > .MuiFormControl-root {
    margin-right: 11px;
    width: 68px;
  }
`;

const DaysWrap = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 10px;
  letter-spacing: 0.25px;
  color: #FFFFFF;
`;

const LabelText = styled.span`
  font-size: 11px;
  line-height: 10px;
  letter-spacing: 0.25px;
  color: #fff;
  font-weight: 700;
`;

const SliderRange = ({
  pointsToShow = [],
  marks = [],
  title = ''
}) => {
  const [sliderValue, setSliderValue] = useState(0);
  const getMarks = () => {
    return marks.reduce((acc, value) => {
      acc[value] = {
        label: <span style={{
          position: 'relative',
          top: '-19px',
          display: pointsToShow.includes(value) ? 'block' : 'none'
        }}>
          <Round></Round>
          <LabelText>{value}</LabelText>
        </span>
      };
      return acc;
    }, {});
  }

  const handlerChange = (value) => {
    setSliderValue(value);
  }

  const marksItems = useMemo(getMarks, []);
  return (
    <SliderRangeWrap>
      <SliderHeader>
        <Title>
          {title}
        </Title>
        <TextFieldWrap>
          <TextField
            value={sliderValue}
            id="outlined-basic"
            variant="outlined"
          />
          <DaysWrap>
            Days
          </DaysWrap>
        </TextFieldWrap>

      </SliderHeader>
      <Slider
        dots
        min={0}
        max={marks[marks.length - 1]}
        marks={marksItems}
        step={null}
        onChange={handlerChange}
        defaultValue={0}
        dotStyle={{
          borderColor: '#A8A8A8',
          background: '#A8A8A8',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.75)',
          width: '16px',
          height: '16px',
          display: 'none'
        }}
        activeDotStyle={{
          borderColor: '#F3C980',
          background: '#F3C980',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.75)',
          width: '16px',
          height: '16px',
          // display: 'none'
        }}
        handleStyle={{
          boxShadow: 'none!important',
          height: '28px',
          width: '28px',
          marginTop: '-12px',
          backgroundColor: '#F3C980',
          borderColor: '#F3C980',
          zIndex: 10
        }}
        trackStyle={{ backgroundColor: '#F3C980', height: 4 }}
        railStyle={{ backgroundColor: '#A8A8A8', height: 4 }}
      />
    </SliderRangeWrap>
  );
}

export default SliderRange;