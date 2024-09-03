import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

function Search() {
  const navigate = useNavigate();
  function search(e) {
    e.preventDefault();
    const query = new FormData(e.target).get("query");
    return navigate(`/admin/search?query=${query}`);
  }

  return (
    <SearchForm onSubmit={search}>
      <input name="query" placeholder="article..." />
      <button type="submit">
        <CiSearch />
      </button>
    </SearchForm>
  );
}

const SearchForm = styled.form`
  display: flex;
  align-items: center;

  input {
    height: 100%;
    background-color: #ffffff00;
    border: 1px solid white;
    border-radius: 10px;
    color: white;
    padding: 10px 10px;
    width: 180px;
    font-size: 1em;
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
