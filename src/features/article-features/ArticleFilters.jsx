import { NavLink } from 'react-router-dom';

function ArticleFilters() {
  return (
    <div className="links">
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
    </div>
  );
}

export default ArticleFilters;
