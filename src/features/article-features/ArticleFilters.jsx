import { NavLink } from "react-router-dom";
import styled from "styled-components";

function ArticleFilters() {
  return (
    <LinkContainer>
      <NavLink
        id={
          location.pathname + location.search === "/admin/articles"
            ? "queryActive"
            : ""
        }
        to="/admin/articles"
      >
        All
      </NavLink>
      <NavLink
        id={
          location.pathname + location.search ===
          "/admin/articles?filter=published"
            ? "queryActive"
            : ""
        }
        to="/admin/articles?filter=published"
      >
        Published
      </NavLink>
      <NavLink
        id={
          location.pathname + location.search ===
          "/admin/articles?filter=unpublished"
            ? "queryActive"
            : ""
        }
        to="/admin/articles?filter=unpublished"
      >
        Unpublished
      </NavLink>
    </LinkContainer>
  );
}

const LinkContainer = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  display: flex;
  align-items: flex-start;
  gap: 10px;

  a {
    &:hover {
      background-color: #a5c77e;
    }
    transition: 0.3s ease-out;
    font-weight: 400;
    color: black;
    background-color: #8eac6c;
    padding: 10px;
    min-width: 50px;
    text-align: center;
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;
  }

   a#queryActive {
    background-color: #ffd159;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 1px 4px,
      rgb(51, 51, 51) 0px 0px 0px 3px;
  }
`;

export default ArticleFilters;
