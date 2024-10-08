import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    if (search) {
      const query = new FormData(e.target).get("query");
      return navigate(`/admin/search?query=${query}`, {
        state: { referrer: location.pathname, previousQuery: location.search },
      });
    }
  }

  return (
    <SearchForm onSubmit={handleSearch}>
      <input
        onChange={({ target }) => setSearch(target.value)}
        name="query"
        placeholder="article..."
      />
      <button type="submit">
        <CiSearch />
      </button>
    </SearchForm>
  );
}

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;

  input {
    background-color: #ffffff00;
    border: 0.75px solid white;
    border-radius: 10px;
    color: white;
    padding: 10px 10px;
    width: 180px;
  }

  input::placeholder {
    color: white;
  }

  button {
    background-color: #ffffff00;
    color: white;
    border: none;
    cursor: pointer;

    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export default Search;
