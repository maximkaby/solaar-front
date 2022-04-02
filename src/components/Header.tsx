import React from 'react';
import { ReactComponent as GaiaLogo } from "src/assets/icons/gaia-logo.svg";
import styled from 'styled-components';
import { Link } from '@material-ui/core';
import { screenMaxSize } from "../themes/global";
import { SOCIAL_LINKS } from "src/constants";

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  svg {
    height: 60px;
    width: 80px;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  @media ${screenMaxSize.sm} {
    display: none;
  }
`;

const MenuItem = styled(Link)`
  position: relative;
  top: 2px;
  margin-right: 20px!important;
  color: #0A2533!important;
  font-weight: 600;
  line-height: 16px;
  &:last-of-type {
    margin-right: 32px!important;
  }
`;

const HeaderRight = styled.div`
  display: flex;
`;

const EnterApp = styled.a`
  padding: 7px 31px;
  display: none;
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

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 52px;
  padding-top: 12px;
`;


const Header = () => {
  return (
    <HeaderWrap>
      <LogoWrap>
        <GaiaLogo />
      </LogoWrap>
      <HeaderRight>
        <Menu>
          <MenuItem target="_blank" href={SOCIAL_LINKS.twitter}>
            Twitter
          </MenuItem>
          <MenuItem target="_blank" href={SOCIAL_LINKS.discord}>
            Discord
          </MenuItem>
          <MenuItem target="_blank" href={SOCIAL_LINKS.github}>
            Github
          </MenuItem>
          <MenuItem target="_blank" href={SOCIAL_LINKS.medium}>
            Medium
          </MenuItem>
        </Menu>
        <EnterApp href="//app.solaarprotocol.com" target="_blank">
          <span>
            Enter App
          </span>
        </EnterApp>
      </HeaderRight>
    </HeaderWrap>
  );
}

export default Header;