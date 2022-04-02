import React from 'react';
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Trans } from "@lingui/macro";
import { Skeleton } from "@material-ui/lab";

const InfoRowWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 12px;
  & p:nth-of-type(2) {
    color: #999999;
  }
`;

const InfoRow = ({
  isAppLoading = false,
  value,
  title = ''
}: any) => {

  return (
    <InfoRowWrap>
      <Typography variant="body1">
        <Trans>{title}</Trans>
      </Typography>
      <Typography variant="body1">
        {isAppLoading ? <Skeleton width="80px" /> : <>{value}</>}
      </Typography>
    </InfoRowWrap>
  )
}

export default InfoRow;