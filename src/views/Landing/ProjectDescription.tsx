import React from 'react';
import styled from 'styled-components';
import GaiaPlanetMain from 'src/assets/images/gaia-planet.png';
import { Button } from '@material-ui/core';
import { screenMaxSize } from "src/themes/global";

const ProjectDescriptionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 100px;
  padding-top: 50px;

  @media ${screenMaxSize.sm} {
    flex-direction: column;
    padding-top: 0px;
    padding-bottom: 50px;
  }
`;

const DescriptionBlock = styled.div`
  margin-top: 60px;
  flex-basis: 47%;
  @media ${screenMaxSize.sm} {
    margin-top: 30px;
    margin-bottom: 40px;
  }
`;

const IconBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 50%;
`;

const TreeImg = styled.img`
  width: 100%;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 53.2345px;
  line-height: 54px;
  letter-spacing: -0.04em;
  color: #042D3A;
  br {
    display: none;
  }
  @media ${screenMaxSize.sm} {
    font-size: 34px;
    text-align: center;
  }
`;

const SubTitle = styled.div`
  font-weight: normal;
  font-size: 22px;
  line-height: 32px;
  color: #042D3A;
  margin-bottom: 50px;
  @media ${screenMaxSize.sm} {
    text-align: center;
    br {
      display: none;
    }
  }
`;

const EnterAppWrap = styled.div`
  @media ${screenMaxSize.sm} {
    display: flex;
    justify-content: center;
  }
`;

const EnterApp = styled.a`
  width: 216px;
  padding: 9px 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00C07C;
  color: white!important;
  border-radius: 6.87891px;
  cursor: pointer;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  span {
    position: relative;
    top: 1px;
  }
`;

const ProjectDescription = () => {

  return (
    <ProjectDescriptionWrap>
      <DescriptionBlock>
        <Title>
          A pioneer in environmental <br/> investing on blockchain
        </Title>
        <SubTitle>
          Our purpose is to make prosperity possible for more people <br/>
          and our planet. SOLR will help advance sustainability <br/>
          and generate wealth from it.
        </SubTitle>
        <EnterAppWrap>
          <EnterApp href="//app.solaarprotocol.com" target="_blank">
            <span>
              Enter App
            </span>
          </EnterApp>
        </EnterAppWrap>
      </DescriptionBlock>
      <IconBlock>
        <TreeImg src={GaiaPlanetMain} alt="" />
      </IconBlock>
    </ProjectDescriptionWrap>
  );
}

export default ProjectDescription;