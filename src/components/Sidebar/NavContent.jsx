import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./Social";
import externalUrls from "./externalUrls";
import { ReactComponent as StakeIcon } from "src/assets/icons/stake.svg";
import { ReactComponent as BondIcon } from "src/assets/icons/bond.svg";
import { ReactComponent as DashboardIcon } from "src/assets/icons/dashboard-icon.svg";
import { ReactComponent as SolaarLogo } from "src/assets/icons/solaar-logo.svg";
import { ReactComponent as AirdropIcon } from "src/assets/icons/airdrop-icon.svg";
import { ReactComponent as CalculatorIcon } from "src/assets/icons/calculator-icon.svg";

import { Trans } from "@lingui/macro";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography, SvgIcon, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./sidebar.scss";
import { Networks } from "../../constants";



function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const { chainID } = useWeb3Context();
  const { bonds } = useBonds(chainID);

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    return false;
  }, []);

  const getScanUrl = txnHash => {
    return chainID === Networks.AVAX_TESTNET ?
      "https://testnet.snowtrace.io/address/" + txnHash :
      "https://snowtrace.io/address/" + txnHash;
  };

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="" target="_blank" className="">
              <SolaarLogo />
            </Link>
            <div className="wallet-link">
              {address &&
                <Link href={getScanUrl(address)} target="_blank">
                  {shorten(address)}
                </Link>
              }
            </div>
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="dash-nav"
                to="/dashboard"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className={`dapp-sidebar-link ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <DashboardIcon></DashboardIcon>
                  <Trans>Dashboard</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="stake-nav"
                to="/"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake");
                }}
                className={`dapp-sidebar-link ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <StakeIcon></StakeIcon>
                  <Trans>Stake</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="bond-nav"
                to="/bonds"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds");
                }}
                className={` dapp-sidebar-link ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <BondIcon></BondIcon>
                  <Trans>Bond</Trans>
                </Typography>
              </Link>

              <div className="dapp-menu-data discounts">
                <div className="bond-discounts">
                  <Typography variant="body2">
                    <Trans>Bond discounts</Trans>
                  </Typography>
                  {bonds.map((bond, i) => (
                    <Link
                      component={NavLink}
                      to={`/bonds/${bond.name}`}
                      key={i}
                      className={"bond"}
                    >
                      {!bond.bondDiscount ? (
                        <Skeleton variant="text" width={"150px"} />
                      ) : (
                        <Typography variant="body2">
                          {bond.displayName}

                          <span className="bond-pair-roi">
                            {!bond.isAvailable[chainID]
                              ? "Sold Out"
                              : `${bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%`}
                          </span>
                        </Typography>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                component={NavLink}
                id="airdrop"
                to="/airdrop"
                isActive={(match, location) => {
                  return checkPage(match, location, "airdrop");
                }}
                className={` dapp-sidebar-link ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <AirdropIcon></AirdropIcon>
                  <Trans>Airdrop</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="calculator"
                to="/calculator"
                isActive={(match, location) => {
                  return checkPage(match, location, "calculator");
                }}
                className={` dapp-sidebar-link ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <CalculatorIcon></CalculatorIcon>
                  <Trans>Calculator</Trans>
                </Typography>
              </Link>

              <Box className="menu-divider">
                <Divider />
              </Box>
              <div className="external-links">
                {Object.keys(externalUrls).map((link, i) => {
                  return (
                    <Link
                      key={i}
                      href={`${externalUrls[link].url}`}
                      className="dapp-sidebar-link"
                      target="_blank">
                      <Typography variant="h6">{externalUrls[link].icon}</Typography>
                      <Typography variant="h6">{externalUrls[link].title}</Typography>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-external-links">

          </div>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

export default NavContent;
