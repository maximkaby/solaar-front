import React from 'react';
import styled from "styled-components";
import WorkItem from "./WorkItem";
import TreePointOne from 'src/assets/images/tree-point-1.png';
import TreePointTwo from 'src/assets/images/tree-point-2.png';
import TreePointThree from 'src/assets/images/tree-point-3.png';
import { screenMaxSize } from 'src/themes/global'

const ProjectWorkWrap = styled.div`
  margin-top: 98px;
  margin-bottom: 130px;
  @media ${screenMaxSize.sm} {
    margin-top: 60px;
    margin-bottom: 80px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 54.762px;
  line-height: 55px;
  text-align: center;
  letter-spacing: -0.04em;
  color: #042D3A;
`;


const ProjectWork = () => {
  return (
    <ProjectWorkWrap>
      <Title>
        How SOLR Dao Works
      </Title>
      <WorkItem
        imgSrc={TreePointOne}
        title={<span>Actively fighting global warming</span>}
        subTitle={<span>
          SOLR will plant as many trees as there are monthly stakers.
          Moreover, SOLR has a growing treasury. These funds will be used
          to further invest in sustainable assets. These could include green
          technologies, recycling, preserving ecosystems, and other ideas
          shared by the community.
        </span>}
      />
      <WorkItem
        imgSrc={TreePointTwo}
        reverse={true}
        title={'High Staking rewards'}
        subTitle={
          <span>
            SOLR will provide high staking rewards to its community.
            By staking SOLR you will earn more SOLR tokens every day.
            <br/><br/>
            Thanks to innovative staking mechanisms, SOLR allows its
            users to earn a high Annual Percentage Yield (APY)
            tracked on our app. Several randomly-timed rebases
            every day allow stakers to passively grow their amount of SOLR.
          </span>
        }/>
      <WorkItem
        imgSrc={TreePointThree}
        title={'Intrinsic Token Value'}
        subTitle={
          <span>
            The SOLR token is programmed to stay above a certain
            price thanks to the treasury backing. This mechanism
            is explained in our documents.
          </span>
        }/>
    </ProjectWorkWrap>
  );
}

export default ProjectWork;