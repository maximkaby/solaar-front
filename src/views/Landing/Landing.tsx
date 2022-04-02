import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Container from '@material-ui/core/Container';
import Header from "src/components/Header";
import ProjectDescription from "./ProjectDescription";
import ProjectStat from "./ProjectStat/ProjectStat";
import ProjectWork from "./ProjectWork/ProjectWork";
import CommunityInfo from "src/components/CommunityInfo/CommunityInfo";
import { ReactComponent as GaiaLogo } from "src/assets/icons/gaia-logo.svg";
import { useDispatch } from "react-redux";
import { useWeb3Context } from "../../hooks";
import useBonds from "../../hooks/Bonds";
import { loadAppDetails } from "src/slices/AppSlice";
import { calcBondDetails } from "../../slices/BondSlice";

const LandingWrap = styled.div`
  font-family: 'Baloo Bhaina 2', cursive;
`;

const FirstScreenWrap = styled.div`
  background-color: #F1F6F5;
`;

const CommunityInfoWrap = styled.div`
  margin-bottom: 80px;
`;

const GaiaLogoWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 80px;
`;

const Landing = () => {
  const dispatch = useDispatch();

  const { provider, chainID, connected } = useWeb3Context();
  const { bonds } = useBonds(chainID);

  const loadApp = useCallback(
    loadProvider => {
      dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));
      bonds.map(bond => {
        dispatch(calcBondDetails({
          bond,
          value: "",
          provider: loadProvider,
          networkID: chainID
        }));
      });
    },
    [connected],
  );

  useEffect(() => {
    loadApp(provider);
  }, []);

  return (
    <LandingWrap>
      <FirstScreenWrap>
        <Container>
          <Header />
          <ProjectDescription />
        </Container>
      </FirstScreenWrap>
      <ProjectStat />
      <Container>
        <ProjectWork />
        <CommunityInfoWrap>
          <CommunityInfo theme="green"/>
        </CommunityInfoWrap>
        <GaiaLogoWrap>
          <GaiaLogo />
        </GaiaLogoWrap>
      </Container>
    </LandingWrap>
  )
}

export default Landing;