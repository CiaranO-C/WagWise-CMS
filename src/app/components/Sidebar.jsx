import { DiGithubBadge } from "react-icons/di";
import { RiLogoutCircleRFill } from "react-icons/ri";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../services/authService";
import { AuthContext } from "../../services/authProvider";
import { useContext, useState } from "react";

function handleLogout() {
  logout();
}

function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <Aside>
      <img src="/wagwise-logo.png" alt="wagwise logo" />
      <NavigationLinks>
        <NavLink to="/admin/home">Home</NavLink>
        <NavLink to="/admin/articles">Articles</NavLink>
        <NavLink to="/admin/tags">Tags</NavLink>
      </NavigationLinks>
      <div className="links">
        <LogoutButton aria-label="Logout" onClick={handleLogout}>
          <RiLogoutCircleRFill />
        </LogoutButton>
        <div>
          <a href="/*link to user front end*/">User Site</a>
          <a
            href="https://github.com/CiaranO-C/wagwise-cms"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiGithubBadge />
          </a>
        </div>
      </div>
      <div className="circle"></div>
    </Aside>
  );
}

const LogoutButton = styled.button`
  display: flex;
  border: none;
  background-color: RGB(255, 255, 255, 0);
  cursor: pointer;
  transition: color 0.25s;
  font-size: 2em;
`;

const NavigationLinks = styled.div`
display: flex;
flex-direction: column;
`;

const Aside = styled.aside`
  background-color: rgb(225, 105, 34);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  img {
    width: 80%;
    z-index: 1;
    pointer-events: none;
  }

  .circle {
    border-radius: 50%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 8px 8px 0px;
    background-color: #ffec00;
    width: 350px;
    height: 350px;
    position: absolute;
    top: -215px;
  }

  button:hover {
    color: #ffec00;
  }

  .links {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  .links > div {
    background-color: rgb(225, 105, 34);
    border-top: 1px solid rgb(166, 71, 22);
    width: 90%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .links a {
    display: flex;
    align-items: center;
    color: black;
    font-size: 0.8em;
  }

  .links a:hover {
  color: #ffec00;
  }

  .links a>svg {
  width: 30px;
  height: 30px;
  }
`;

export default Sidebar;
