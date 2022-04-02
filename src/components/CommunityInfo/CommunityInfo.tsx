import React from 'react';
import styled from 'styled-components';
import { Link } from '@material-ui/core';
import { ReactComponent as TwitterIcon } from "src/assets/icons/twitter-icon.svg";
import { ReactComponent as DiscordIcon } from "src/assets/icons/discord-icon.svg";
import { ReactComponent as GithubIcon } from "src/assets/icons/github-icon.svg";
import { ReactComponent as TelegramIcon } from "src/assets/icons/telegram-icon.svg";
import { ReactComponent as DocsIcon } from "src/assets/icons/docs-icon.svg";
import { SOCIAL_LINKS } from "src/constants";
import { screenMaxSize } from 'src/themes/global'

const CommunityInfoWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const LinkButtonWrap = styled(Link)`
  width: 282px;
  //height: 210px;
  display: flex;
  //background-color: #fff;
  //border-radius: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: ease-in 100ms;
  color: rgba(10, 37, 51, 0.98)!important;
  font-weight: 600;
  font-size: 24px;
  line-height: 22px;
  letter-spacing: -0.04em;
  
  p {
    color: white;
  }

  &:hover {
    //box-shadow: 6px 2px 20px #e1e1e1;
    //transition: ease-in 100ms;
  }
  
  svg {
    path {
      fill: #F3C980;
    }
  }

  @media screen and (max-width: 1000px) {
    //width: 160px;
    //height: 112px;
  }

  @media ${screenMaxSize.sm} {
    width: 100%;
    margin-bottom: 24px!important;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 43.7638px;
  line-height: 44px;
  letter-spacing: -0.04em;
  color: #fff;
  margin-bottom: 52px;
  text-align: center;
  @media ${screenMaxSize.sm} {
    font-size: 28px;
  }
`;

const CommunityLinks = styled.div`
  display: flex;
  & > a {
    margin-right: 24px;
    background-color: ${props => {
      return props.theme === 'green' ? '#E6F3F1' : ''
    }};
    color: ${props => props.theme === 'green' ? '#042D3A' : ''};
    
    &:last-of-type {
      margin-right: 0;
    }
    
    &:hover {
      box-shadow: ${props => props.theme === 'green' ? '6px 2px 20px #E6F3F1;' : ''};
    }
  }

  @media ${screenMaxSize.sm} {
    width: 100%;
    flex-direction: column;
  }
`;

function LinkButton({ name, href, icon } : any) {
  return (
    <LinkButtonWrap href={href}>
      {icon}
      <p>{name}</p>
    </LinkButtonWrap>
  );
}

const CommunityInfo = ({ theme = '' }: any) => {
  return (
    <CommunityInfoWrap>
      <Title>
        Join our community
      </Title>
      <CommunityLinks theme={theme}>
        <LinkButton
          name="Twitter"
          href={SOCIAL_LINKS.twitter}
          icon={<TwitterIcon />} />
        <LinkButton
          name="Discord"
          href={SOCIAL_LINKS.discord}
          icon={<DiscordIcon />} />
        {/*<LinkButton*/}
        {/*  name="Github"*/}
        {/*  href={SOCIAL_LINKS.github}*/}
        {/*  icon={<GithubIcon />} />*/}
        <LinkButton
          name="Telegram"
          href={SOCIAL_LINKS.telegram}
          icon={<TelegramIcon style={{
            width: '60px'
          }}/>} />
      </CommunityLinks>
    </CommunityInfoWrap>
  )
}

export default CommunityInfo;
