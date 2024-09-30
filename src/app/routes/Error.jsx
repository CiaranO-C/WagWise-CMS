import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";
import NotFound from "../../components/404";
import Unauthorized from '../../components/401';
import { Button, Content } from '../sharedStyles';

function ErrorPage() {
  const { status } = useRouteError();

  console.log(status);

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
      <Link className="button" to="/login">Go to login</Link>
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
