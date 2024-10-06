import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";
import { Button, Content } from "../../components/sharedStyles";
import { Unauthorized } from "../../features/error-pages/401";
import { NotFound } from "../../features/error-pages/404";

function ErrorPage() {
  const { status } = useRouteError();

  const errorComponents = {
    404: <NotFound />,
    401: <Unauthorized />,
  };

  return (
    <ErrorMain>
      {errorComponents[status] ? (
        errorComponents[status]
      ) : (
        <p>Unknown error!</p>
      )}
      <Link className="button" to="/login">
        Go to login
      </Link>
    </ErrorMain>
  );
}

const ErrorMain = styled.main`
  ${Content}
  justify-items: center;
  align-items: center;
  background-color: #8eac6c;

  .button {
    ${Button}
  }
`;

export default ErrorPage;
