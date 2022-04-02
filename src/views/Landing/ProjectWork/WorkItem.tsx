import React from 'react';
import styled from "styled-components";
import { screenMaxSize } from 'src/themes/global'

const WorkItemWrap = styled.div`
  display: flex;
  justify-content: space-around;
  @media ${screenMaxSize.sm} {
    flex-direction: column!important;
  }
`;

const DescriptionBlock = styled.div`
  margin-top: 60px;
  @media ${screenMaxSize.sm} {
    margin-top: 30px;
  }
`;

const IconBlock = styled.div`
  @media ${screenMaxSize.sm} {
    text-align: center;
  }
  img {
    width: 330px;
  }
`;

const Point = styled.div`
  font-size: 24.6905px;
  line-height: 42px;
  font-family: 'Baloo Da 2', cursive;
  /* Fonts/Primary */
  margin-bottom: 15px;
  color: #00C07C;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 43.7638px;
  line-height: 44px;
  /* or 101% */
  letter-spacing: -0.04em;
  color: #042D3A;
  margin-bottom: 15px;
  @media ${screenMaxSize.sm} {
    font-size: 36px;
  }
`;

const SubTitle = styled.div`
  font-weight: normal;
  font-size: 22px;
  line-height: 31px;
  color: #042D3A;
  max-width: 600px;
  @media ${screenMaxSize.sm} {
    br {
      display: none;
    }
  }
`;



const ProjectWork = ({
   imgSrc = '',
   reverse = false,
  point,
                       title,
                       subTitle
}: any) => {
  return (
    <WorkItemWrap style={{
      flexDirection: reverse && 'row-reverse'
    }}>
      <DescriptionBlock>
        <Title>
          {title}
        </Title>
        <SubTitle>
          {subTitle}
        </SubTitle>
      </DescriptionBlock>
      <IconBlock>
        <img src={imgSrc} alt=""/>
      </IconBlock>
    </WorkItemWrap>
  );
}

export default ProjectWork;