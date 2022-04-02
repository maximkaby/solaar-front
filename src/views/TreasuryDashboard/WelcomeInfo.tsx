import React from 'react';
import styled from "styled-components";
import GaiaPlanetMain from 'src/assets/images/gaia-planet.png';
import { screenMaxSize } from "src/themes/global";

const WelcomeInfoWrap = styled.div`
  display: flex;
  padding-bottom: 20px;
  border-bottom: 2px solid #8AA8B1;
  margin-bottom: 30px;
  @media ${screenMaxSize.sm} {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 48.83px;
  line-height: 50px;
  color: #042D3A;
  span {
    color: #00B070;
  }
  @media ${screenMaxSize.sm} {
    font-size: 32px;
    text-align: center;
    margin-bottom: 10px;
  }
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 29px;
  color: #042D3A;
  margin-bottom: 20px;
`;

const DescriptionBlock = styled.div`
  margin-right: 69px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${screenMaxSize.sm} {
    margin-right: 0;
  }
`;

const IconWrap = styled.div`
  @media ${screenMaxSize.sm} {
    display: flex;
    justify-content: center;
  }
  img {
    height: 200px;
    @media ${screenMaxSize.sm} {
      height: 150px;
    }
  }
`;


const WelcomeInfo = () => {
  return (
    <WelcomeInfoWrap>
      <DescriptionBlock>
        <Title>
          Welcome to <span>SOLR Dao</span>
        </Title>
      </DescriptionBlock>
      <IconWrap>
        <img src={GaiaPlanetMain} alt="" />
      </IconWrap>
    </WelcomeInfoWrap>
  );
}

export default WelcomeInfo;