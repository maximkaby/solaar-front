import { memo } from "react";
import "./treasury-dashboard.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Paper, Grid, Box, Zoom, Container, useMediaQuery } from "@material-ui/core";
import {
  MarketCap,
  OHMPrice,
  CircSupply,
  BackingPerOHM,
  CurrentIndex,
  StakingAPY,
  TVL,
  TreasuryBalance,
  FiveDaysStaked
} from "./components/Metric/Metric";
import styled from "styled-components";
import CommonInfo from './CommonInfo/CommonInfo';
import WelcomeInfo from "./WelcomeInfo";
import { screenMaxSize } from "src/themes/global";

const DataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  & > div {
    flex: 1 1 calc((100% / 2) - 20px);
    @media ${screenMaxSize.sm} {
      flex: 1 1 100%;
    }
  }
`;

const TreasuryDashboard = memo(() => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  return (
    <div id="treasury-dashboard-view" className={`${isSmallScreen && "smaller"} ${isVerySmallScreen && "very-small"}`}>
      <Container
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
        }}
      >

        <CommonInfo></CommonInfo>
        <Box className="hero-metrics">
          <DataContainer>
            <MarketCap />
            <OHMPrice />
            <StakingAPY />
            <CircSupply />
            <BackingPerOHM />
            <CurrentIndex />
            {/*<TVL />*/}
            {/*<TreasuryBalance />*/}
            {/*<FiveDaysStaked />*/}
          </DataContainer>
        </Box>
      </Container>
    </div>
  );
});

const queryClient = new QueryClient();

// Normally this would be done
// much higher up in our App.
export default () => (
  <QueryClientProvider client={queryClient}>
    <TreasuryDashboard />
  </QueryClientProvider>
);
