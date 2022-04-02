import React from 'react';
import styled from "styled-components";
import MuiCircularProgress from "@material-ui/core/CircularProgress";


const CircularProgressWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const CircularProgress = styled(MuiCircularProgress)`
  color: #F3C980!important;
`;

const Loader = () => {
  return (
    <CircularProgressWrap>
      <CircularProgress />
    </CircularProgressWrap>
  );
};

export default Loader;
