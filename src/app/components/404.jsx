import { CiFaceFrown } from "react-icons/ci";
import styled from "styled-components";
import { ErrorStatus } from "../sharedStyles";

function NotFound() {
  return (
    <>
      <StatusContainer>
        <CiFaceFrown />
        <h1>404</h1>
        <CiFaceFrown />
      </StatusContainer>
      <p>Sorry, the page you are looking for doesn't exist!</p>
    </>
  );
}

const StatusContainer = styled.div`
  ${ErrorStatus}
`;

export default NotFound;
