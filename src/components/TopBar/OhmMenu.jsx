import { useState } from "react";
import { addresses, TOKEN_DECIMALS } from "src/constants";
import { Link, SvgIcon, Popper, Button, Paper, Typography, Divider, Box, Fade, Slide } from "@material-ui/core";
import { ReactComponent as InfoIcon } from "src/assets/icons/info-icon.svg";
import { ReactComponent as WalletIcon } from "src/assets/icons/wallet-icon.svg";
import { ReactComponent as ArrowUpIcon } from "src/assets/icons/arrow-up.svg";
import { ReactComponent as GaiaTokenImg } from "src/assets/icons/gaia-logo-tree.svg";
import { ReactComponent as SolrIcon } from "src/assets/icons/solr-icon.svg";
import styled from 'styled-components';
import { TOKEN_NAME } from "src/constants";
import "./ohmmenu.scss";
import { Trans } from "@lingui/macro";
import { useWeb3Context } from "src/hooks/web3Context";

import { segmentUA } from "src/helpers/userAnalyticHelpers";
import GaiaTokenImgPath from "src/assets/icons/gaia-logo-tree.svg";


const addTokenToWallet = (tokenSymbol, tokenAddress, address) => async () => {
  if (window.ethereum) {
    const host = window.location.origin;
    let tokenPath = GaiaTokenImgPath;
    let tokenDecimals = String(TOKEN_DECIMALS);
    const imageURL = `${host}/${tokenPath}`;

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: imageURL,
          },
        },
      });
      let uaData = {
        address: address,
        type: "Add Token",
        tokenName: tokenSymbol,
      };
      segmentUA(uaData);
    } catch (error) {
      console.log(error);
    }
  }
};

function OhmMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isEthereumAPIAvailable = window.ethereum;
  const { chainID, address } = useWeb3Context();

  const networkID = chainID;

  const SGAIA_ADDRESS = addresses[networkID].SGAIA_ADDRESS;
  const GAIA_ADDRESS = addresses[networkID].GAIA_ADDRESS;
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };



  const open = Boolean(anchorEl);
  const id = "ohm-popper";
  // const daiAddress = dai.getAddressForReserve(networkID);
  // const fraxAddress = frax.getAddressForReserve(networkID);
  return (
    <Box
      component="div"
      onMouseEnter={e => handleClick(e)}
      onMouseLeave={e => handleClick(e)}
      id="ohm-menu-button-hover"
    >
      <Button
        id="ohm-menu-button"
        size="large"
        variant="contained"
        color="secondary"
        title={TOKEN_NAME}
        aria-describedby={id}
      >
        <WalletIcon />
        <span>Wallet</span>
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="ohm-menu" elevation={1}>
                <Box component="div" className="buy-tokens">

                  <Link
                    href={'https://pancakeswap.finance/'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="large" variant="contained" color="secondary" fullWidth>
                      <Typography align="left">
                        <Trans>Buy on {new String("Pancake Swap")}</Trans>
                        <SvgIcon component={ArrowUpIcon} htmlColor="#A3A3A3" />
                      </Typography>
                    </Button>
                  </Link>
                </Box>


                {isEthereumAPIAvailable ? (
                  <Box className="add-tokens">
                    <Divider color="secondary" />
                    <p>
                      <Trans>ADD TOKEN TO WALLET</Trans>
                    </p>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                      {GAIA_ADDRESS && (
                        <Button
                          variant="contained"
                          color="secondary"
                          className="token-wallet"
                          onClick={addTokenToWallet(TOKEN_NAME, GAIA_ADDRESS, address)}
                        >
                          <SolrIcon />
                          <Typography variant="body1">{TOKEN_NAME}</Typography>
                        </Button>
                      )}
                      {SGAIA_ADDRESS && (
                        <Button
                          variant="contained"
                          color="secondary"
                          className="token-wallet"
                          onClick={addTokenToWallet(`s${TOKEN_NAME}`, SGAIA_ADDRESS, address)}
                        >
                          <SolrIcon />
                          <Typography variant="body1">s{TOKEN_NAME}</Typography>
                        </Button>
                      )}
                    </Box>
                  </Box>
                ) : null}
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </Box>
  );
}

export default OhmMenu;
