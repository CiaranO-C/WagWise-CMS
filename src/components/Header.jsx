import { DiGithubBadge } from "react-icons/di";
import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
      <img src="/src/assets/wagwise-logo.png" alt="wagwise logo" />
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
      background-color: rgb(163 191 130);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;


  img {
    width: 112px;
  }
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
