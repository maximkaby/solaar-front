import { useSelector, useDispatch } from "react-redux";
import { getRebaseBlock, secondsUntilBlock, prettifySeconds } from "src/helpers";
import { Box, Typography } from "@material-ui/core";
import "./rebasetimer.scss";
import { Skeleton } from "@material-ui/lab";
import { useEffect, useMemo, useState } from "react";
import { loadAppDetails } from "src/slices/AppSlice";
import { useWeb3Context } from "src/hooks/web3Context";
import { Trans } from "@lingui/macro";

function RebaseTimer() {
  const dispatch = useDispatch();
  const { provider, chainID } = useWeb3Context();

  const SECONDS_TO_REFRESH = 60;
  const [secondsToRebase, setSecondsToRebase] = useState(0);
  const [rebaseString, setRebaseString] = useState("");
  const [secondsToRefresh, setSecondsToRefresh] = useState(SECONDS_TO_REFRESH);

  const currentBlock = useSelector(state => {
    return state.app.currentBlock;
  });

  const endTime = useSelector(state => {
    return state.app.endTime;
  });

  function initializeTimer() {
    const sec = endTime - Math.ceil(new Date().valueOf() / 1000);
    setSecondsToRebase(sec);
    const prettified = prettifySeconds(sec);
    setRebaseString(prettified !== "" ? prettified : <Trans>Less than a minute</Trans>);
  }

  // This initializes secondsToRebase as soon as currentBlock becomes available
  useMemo(() => {
    if (currentBlock) {
      initializeTimer();
    }
  }, [currentBlock]);

  // After every period SECONDS_TO_REFRESH, decrement secondsToRebase by SECONDS_TO_REFRESH,
  // keeping the display up to date without requiring an on chain request to update currentBlock.
  useEffect(() => {
    let interval = null;
    if (secondsToRefresh > 0) {
      interval = setInterval(() => {
        setSecondsToRefresh(secondsToRefresh => secondsToRefresh - 1);
      }, 1000);
    } else {
      // When the countdown goes negative, reload the app details and reinitialize the timer
      if (secondsToRebase < 0) {
        async function reload() {
          await dispatch(loadAppDetails({ networkID: chainID, provider: provider }));
        }
        reload();
        setRebaseString("");
      } else {
        clearInterval(interval);
        setSecondsToRebase(secondsToRebase => secondsToRebase - SECONDS_TO_REFRESH);
        setSecondsToRefresh(SECONDS_TO_REFRESH);
        const prettified = prettifySeconds(secondsToRebase);
        setRebaseString(prettified !== "" ? prettified : <Trans>Less than a minute</Trans>);
      }
    }
    return () => clearInterval(interval);
  }, [secondsToRebase, secondsToRefresh]);

  return (
    <Box className="rebase-timer">
      <Typography variant="h6">
        {/*{currentBlock ? (*/}
        {/*  secondsToRebase > 0 ? (*/}
        {/*    <>*/}
        {/*      <strong>{rebaseString}&nbsp;</strong>*/}
        {/*      <Trans>to next rebase</Trans>*/}
        {/*    </>*/}
        {/*  ) : (*/}
        {/*    <strong>rebasing</strong>*/}
        {/*  )*/}
        {/*) : (*/}
        {/*  <Skeleton width="155px" />*/}
        {/*)}*/}
        Random Rebasing
      </Typography>
    </Box>
  );
}

export default RebaseTimer;
