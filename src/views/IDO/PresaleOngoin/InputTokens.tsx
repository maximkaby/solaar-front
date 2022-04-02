import React, { useState, useEffect } from "react";
import MuiTextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from 'styled-components';
import Tree from 'src/assets/images/trees-input.png';
import { useIDOContract } from "../hooks";
import { USDC_DECIMALS, GAIA_DECIMALS } from "src/constants";
import { useIDOContextData } from "../IDOContext";
import { INPUT_NUMBER_REGEXP } from "src/constants";

const InputTokensWrap = styled.div`
  display: flex;
  position: relative;
`;

const TreesWrap = styled.div`
  display: none;
  position: absolute;
  right: -140px;
`;

const TreesInfo = styled.div`
  
`;

const TreesTitle = styled.div`
  font-family: 'Baloo Da 2', cursive;
  font-size: 15px;
  line-height: 20px;
  color: #00C07C;
  font-weight: 500;
`;

const TreesCount = styled.div`
  font-size: 26px;
  line-height: 30px;
  color: #042D3A;
`;

const TreeImg = styled.img`
  width: 29px;
  height: 40px;
  margin-right: 14px;
`;

const TextField = styled(MuiTextField)`
  width: 240px!important;
`;

const HelperText = ({ price }: any) => {
  return (
    <div>
      1 SOLR costs {price} USDC
    </div>
  )
}



const InputTokens = ({ value, onChange }: any) => {
  const {
    salePriceGaia,
  } = useIDOContextData();

  const onChangeHandler = (value: any) => {
    if (INPUT_NUMBER_REGEXP.test(value)) {
      onChange(value);
    }
  }

  const onBlurHandler = (value: any) => {
    onChange(Number(value));
  }



  return (
    <InputTokensWrap>
      <TextField
        id="outlined-helperText"
        defaultValue="Default Value"
        placeholder="0"
        helperText={<HelperText price={salePriceGaia}></HelperText>}
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">SOLR</InputAdornment>
        }}
        value={value}
        onChange={e => onChangeHandler(e.target.value)}
        onBlur={e => onBlurHandler(e.target.value)}
      />
      <TreesWrap>
        <TreeImg src={Tree} alt="" />
        <TreesInfo>
          <TreesTitle>
            Trees grown
          </TreesTitle>
          <TreesCount>
            25
          </TreesCount>
        </TreesInfo>
      </TreesWrap>
    </InputTokensWrap>
  )
}

export default InputTokens;