import React from 'react'
import Container from '@material-ui/core/Container';
import Header from 'src/components/Header';
import PresaleOngoin from "./PresaleOngoin/PresaleOngoin";
import styled, { createGlobalStyle } from 'styled-components';
import CommunityInfo from "src/components/CommunityInfo/CommunityInfo";
import { ReactComponent as GaiaLogo } from "src/assets/icons/gaia-logo.svg";
import Messages from "src/components/Messages/Messages";
import { IDOProvider } from "./IDOContext";

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: scroll;
  }
`;

const IDOWrap = styled.div`
  font-family: 'Baloo Bhaina 2', cursive;
  background: #F1F6F5;
`;

const CommunityInfoWrap = styled.div`
  margin-bottom: 80px;
`;

const GaiaLogoWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 80px;
`;

const IDO = () => {
  return (
    <IDOProvider>
      <IDOWrap>
        <GlobalStyle />
        <Messages />
        <Container>
          <Header />
          <PresaleOngoin />
          <CommunityInfoWrap>
            <CommunityInfo />
          </CommunityInfoWrap>
          <GaiaLogoWrap>
            <GaiaLogo />
          </GaiaLogoWrap>
        </Container>
      </IDOWrap>
    </IDOProvider>
  );
}

export default IDO;