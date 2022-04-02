import React from 'react';
import styled from "styled-components";
import {
  Grid, InputAdornment, TextField,
  OutlinedInput, Zoom, Slider,
  Paper, FormControl, InputLabel, Box, Button,
} from "@material-ui/core";
import InfoRow from 'src/components/InfoRow/InfoRow';
import { isPendingTxn, txnButtonText } from "../../slices/PendingTxnsSlice";
import { t } from "@lingui/macro";
import { screenMaxSize } from "src/themes/global";

const AirdropWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  color: #FFFFFF;
  margin-bottom: 29px;
  @media ${screenMaxSize.sm} {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  letter-spacing: 0.25px;
  margin-bottom: 12px;
`;

const Description = styled.div`
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.25px;
  @media ${screenMaxSize.sm} {
    margin-bottom: 15px;
  }
`;

const ClaimButton = styled(Button)`
  width: 240px;
  align-self: end;
`;

const ClaimButtonWrap = styled.div`
  @media ${screenMaxSize.sm} {
    display: flex;
    justify-content: center;
  }
`;

const Airdrop = () => {
  return (
    <AirdropWrap>
      <Paper className="ohm-card">
        <Header>
          <Box>
            <Title>
              Airdrops
            </Title>
            <Description>
              Read our Medium article for airdrop details.
            </Description>
          </Box>
          <ClaimButtonWrap>
            <ClaimButton
              variant="contained"
              color="primary"
              onClick={() => {}}
            >
              Claim
            </ClaimButton>
          </ClaimButtonWrap>
        </Header>
        <InfoRow
          value={0}
          title="Unclaimed Balance"
        />
        <InfoRow
          value={0}
          title="Claimed Balance"
        />
      </Paper>
    </AirdropWrap>
  );
}

export default Airdrop;