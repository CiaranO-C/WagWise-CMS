import { DiGithubBadge } from "react-icons/di";
import styled from "styled-components";
import wagwiseLogo from "/assets/wagwise-logo.png";

function Header() {
  return (
    <StyledHeader>
      <div className="sun-container">
        <div className="sun" />
        <img src={wagwiseLogo} alt="wagwise logo" />
      </div>
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
  position: relative;
  overflow: hidden;
  background-color: #818b50;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  z-index: 1;
  box-shadow:
    rgba(0, 0, 0, 0.07) 0px 1px 1px,
    rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px,
    rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;

  img {
    width: 112px;
    position: relative;
    z-index: 1;
  }

  .sun-container {
    position: relative;
    margin-right: 130px;
    display: flex;
  }

  .sun {
    color: #f9d23f;
    width: 275px;
    height: 275px;
    border-radius: 50%;
    background-color: #f9d23f;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    box-shadow:
      8px 0px 24px,
      16px 0px 56px,
      24px 0px 80px,
      -8px 0px 24px,
      -16px 0px 56px,
      -24px 0px 80px;
    transition: color 0.6s ease-in-out;
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
    color: rgb(249, 210, 63);
    border-color: black;
  }

  a + a {
  border-left: 0.75px solid black;
  }

  svg {
    height: 35px;
    width: 35px;
  }
`;

export default Header;
