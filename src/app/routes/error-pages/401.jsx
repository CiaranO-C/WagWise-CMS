import { MdBlock } from "react-icons/md";
import styled from 'styled-components';
import { ErrorStatus } from '../app/sharedStyles';


function Unauthorized() {
  return (
    <>
      <StatusContainer>
        <MdBlock />
        <h1>401</h1>
        <MdBlock />
      </StatusContainer>
      <p>You do not have access to this page!</p>
    </>
  );
}

const StatusContainer = styled.div`
  ${ErrorStatus}
`;

export default Unauthorized;
