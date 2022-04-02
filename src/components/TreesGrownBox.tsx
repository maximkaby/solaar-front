import React from 'react';
import styled from 'styled-components';
import TreeGrown from 'src/assets/images/tree-grown.png';

const TreesGrownBoxWrap = styled.div`
  display: flex;
  width: 229px;
  height: 80px;
  padding: 9px 20px 15px;
  background: #FFFFFF;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.13);
  border-radius: 9.94681px;
`;

const TreeIcon = styled.img`
  width: 43px;
  height: 56px;
  margin-right: 24px;
`;

const DescriptionBlock = styled.div`

`;

const Title = styled.div`
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
  font-family: 'Baloo Da 2', cursive;
  color: #00C07C;
`;

const Count = styled.div`
  font-weight: 500;
  font-size: 31px;
  color: #042D3A;
`;

const TreesGrownBox = () => {
  return (
    <TreesGrownBoxWrap>
      <TreeIcon src={TreeGrown} alt="" />
      <DescriptionBlock>
        <Title>Trees grown</Title>
        <Count>23</Count>
      </DescriptionBlock>
    </TreesGrownBoxWrap>
  );
}

export default TreesGrownBox;