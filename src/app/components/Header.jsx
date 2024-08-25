import { DiGithubBadge } from "react-icons/di";
import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
      <h3>wag wise</h3>
      <LinkContainer className="links">
        <a href="/*link to user front end*/">User Site</a>
        <a
          href="https://github.com/CiaranO-C/wagwise-cms"
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiGithubBadge />
        </a>
      </LinkContainer>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-color: rgb(225, 105, 34);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
`;
const LinkContainer = styled.div`
  display: flex;
  a {
    display: flex;
    align-items: center;
    padding: 0px 10px;
    color: black;
    transition: color 0.3s ease-out;
  }
  a:hover {
    color: white;
  }

  svg {
    height: 35px;
    width: 35px;
  }
`;

export default Header;
