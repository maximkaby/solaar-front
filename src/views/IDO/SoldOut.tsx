import React, { useState } from "react";
import styled from 'styled-components';
import { useIDOContract } from "./hooks";
import { useWeb3Context } from "src/hooks";
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import { error, info } from "../../slices/MessagesSlice";
import { useDispatch } from "react-redux";
import { getErrMessage } from "src/helpers";
import { TOKEN_NAME} from "src/constants";

const SoldOutWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 48px;
  line-height: 54px;
`;

const EnterApp = styled.span`
  width: 216px;
  padding: 7px 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00C07C;
  color: white!important;
  border-radius: 6.87891px;
  cursor: pointer;
  font-weight: 700;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
  span {
    position: relative;
    top: 1px;
  }
`;

const CircularProgressWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircularProgress = styled(MuiCircularProgress)`
  color: #00C07C!important;
`;

const ClaimWrap = styled.div`
  margin-bottom: 10px;
`;

const SoldOut = () => {
  const dispatch = useDispatch();
  const { provider, address } = useWeb3Context();
  const { IDOContract } = useIDOContract();
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  const claim = async () => {
    try {
      setLoadingTransaction(true);
      await IDOContract
        .connect(provider.getSigner())
        .claim(address);
      setLoadingTransaction(false);
      dispatch(info(`Claimed ${TOKEN_NAME} successfully`))
    } catch(err) {
      dispatch(error(getErrMessage(err)))
    } finally {
      setLoadingTransaction(false);
    }

  }

  return (
    <SoldOutWrap>
      <Title>
        Sale Finished!
      </Title>
      <ClaimWrap>
        {loadingTransaction ?
          <CircularProgressWrap>
            <CircularProgress />
          </CircularProgressWrap>
          :
          <EnterApp onClick={claim}>
            Claim
          </EnterApp>
        }
      </ClaimWrap>
      <a style={{ textDecoration: 'none' }} href="https://app.solaarprotocol.com">
        <EnterApp>
          Enter App
        </EnterApp>
      </a>
    </SoldOutWrap>
  )
}

export default SoldOut;