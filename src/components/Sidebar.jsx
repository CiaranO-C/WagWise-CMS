import { DiGithubBadge } from "react-icons/di";
import { RiLogoutCircleRFill } from "react-icons/ri";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/authService.js";
import { AuthContext } from "../services/authProvider.jsx";
import { useContext } from "react";
import wagwiseLogo from "/assets/wagwise-logo.png";

function Sidebar() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  function handleLogout() {
    logout();
    setUser(null);
    navigate("/", { replace: true });
  }

  return (
    <Aside>
      <img src={wagwiseLogo} alt="wagwise logo" />
      <NavigationLinks>
        <NavLink to="/admin/home">Home</NavLink>
        <NavLink to="/admin/articles">Articles</NavLink>
        <NavLink to="/admin/new_article">New Article</NavLink>
        <NavLink to="/admin/tags">Tags</NavLink>
        <NavLink to="/admin/comments">Comments</NavLink>
      </NavigationLinks>
      <div className="links">
        <LogoutButton aria-label="Logout" onClick={handleLogout}>
          <RiLogoutCircleRFill />
        </LogoutButton>
        <div>
          <a href="https://wagwise-blog.vercel.app/">User Site</a>
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
  gap: 20px;
  flex: 1;
  padding-top: 150px;

  a {
    font-weight: 500;
    padding: 10px 0px;
    border-bottom: 0.9px solid transparent;
    width: 100%;
    text-align: center;
    transition: color 0.2s, border-color 0.2s;
  }

  a.active,
  a:hover {
    color: rgb(249, 210, 63);
    border-color: rgb(249, 210, 63);
  }
`;

const Aside = styled.aside`
  background-color: #818b50;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  z-index: 10;

  img {
    width: 80%;
    z-index: 1;
    pointer-events: none;
    position: relative;
    top: 40px;
  }

  .circle {
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 27%) 0px 8px 30px 10px;
    background-color: rgb(249, 210, 63);
    width: 350px;
    height: 350px;
    position: absolute;
    top: -215px;
  }

  button:hover {
    color: rgb(249, 210, 63);
  }

  .links {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  .links > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #818b50;
    padding-top: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px -1px 15px -1px;
  }

  .links a {
    display: flex;
    color: black;
    font-size: 1em;
    margin: 0px 15px;
    align-items: center;
    transition: color 0.3s;
  }

  .links a:hover {
    color: rgb(249, 210, 63);
  }

  .links a > svg {
    width: 30px;
    height: 30px;
  }
`;

export default Sidebar;
