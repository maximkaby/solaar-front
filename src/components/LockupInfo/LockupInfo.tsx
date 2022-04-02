import styled from "styled-components";

const Lockupinfo = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.25px;
  color: #F3C980;
  br {
    display: none;
  }
  span {
    text-decoration: underline;
  }
`;

export const LockupinfoNormal = styled(Lockupinfo)`
  font-weight: 500;
`;

export default Lockupinfo;
