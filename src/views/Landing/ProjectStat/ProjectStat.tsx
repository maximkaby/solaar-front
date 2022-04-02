import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import TreeStat from 'src/assets/images/tree-stat.png';
import StatItem from "./StatItem";
import Container from '@material-ui/core/Container';
import { screenMaxSize } from 'src/themes/global'
import { useAppSelector } from "src/hooks";
import { useSelector } from "react-redux";
import { Skeleton } from "@material-ui/lab";
import { round } from "lodash";
import { trim } from "../../../helpers";
import { allBondsMap } from "../../../helpers/AllBonds";

const ProjectStatWrap = styled.div`
  display: flex;
  padding-top: 28px;
  padding-bottom: 10px;
  background: #0E3B45;
`;


const IconBlock = styled.div`
  margin-right: 40px;
  img {
    height: 90px;
  }
`;

const TreeInfo = styled.div`
  display: flex;
  @media ${screenMaxSize.sm} {
    justify-content: center;
  }
`;

const ContainerFlex = styled(Container)`
  display: flex!important;
  @media ${screenMaxSize.sm} {
    flex-direction: column;
  }
`;

const Divider = styled.div`
  width: 3px;
  height: 84px;
  background: #1E5D6B;
  border-radius: 40px;
  margin-left: 70px;
  margin-right: 70px;
  @media ${screenMaxSize.sm} {
    display: none;
  }
`;

const StatsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  @media ${screenMaxSize.sm} {
    flex-direction: column;
  }
  
  & > div {
    &:last-of-type {
      margin-right: 0;
    }
  }
`;



const ProjectStat = () => {
  const [treesCount,  setTreesCount] = useState(0);
  const stakingAPY = useSelector(state => {
    return state.app.stakingAPY;
  });

  const circSupply = useSelector(state => {
    return state.app.circSupply;
  });

  const treasuryBalance: number | undefined = useAppSelector(state => {
    if (state.bonding.loading == false) {
      let tokenBalances = 0;
      for (const bond in allBondsMap) {
        if (state.bonding[bond]) {
          tokenBalances += state.bonding[bond].purchased;
        }
      }
      return tokenBalances;
    }
  });

  useEffect( () => {
    const getTreesCount = async () => {
      const data = await fetch('https://fukz7g4qv2.execute-api.us-east-1.amazonaws.com/prod/trees')
        .then(res => res.json());
      setTreesCount(data.treesCount);
    }
    getTreesCount();
  }, []);

  return (
    <ProjectStatWrap>
      <ContainerFlex>
        <TreeInfo>
          <IconBlock>
            <img src={TreeStat} alt="" />
          </IconBlock>
          <StatItem
            title={'Trees'}
            value={treesCount}/>
        </TreeInfo>
        <Divider />
        <StatsWrap>
          <StatItem
            title={'Total Staked'}
            value={parseInt(circSupply || 0)}/>
          <StatItem
            title={'Treasury Balance'}
            value={
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }).format(treasuryBalance || 0)
            }/>
          <StatItem
            title={'Current APY'}
            value={`${new Intl.NumberFormat("en-US")
                .format(trim(stakingAPY * 100 || 0, 1))}%`
            }/>
        </StatsWrap>
      </ContainerFlex>
    </ProjectStatWrap>
  );
}

export default ProjectStat;