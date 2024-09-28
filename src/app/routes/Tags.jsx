import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button, Content, GrowFromMiddle } from "../sharedStyles";
import Search from "../components/Search";
import { useState } from "react";
import { createPortal } from "react-dom";
import TagModal from "../components/TagModal";
import PageNums from "../components/Pagination";

function Tags() {
  const data = useLoaderData();
  const perPage = 9 ;
  const [tags, setTags] = useState(data.tags);
  const [range, setRange] = useState(tags.slice(0, perPage));
  const location = useLocation();
  
  const [showModal, setShowModal] = useState(false);
  function handleSetTags(newTag) {
    setTags([...tags, { tagName: newTag, new: true }]);
  }

  function handleRange(i, j) {
    setRange(tags.slice(i, j));
  }
  //outlet renders specific tag page
  const pathArray = location.pathname.slice(1).split("/");
  if (pathArray.length > 2) return <Outlet />;

  return (
    <>
      <TagsMain>
        <header>
          <h1>All Tags</h1>
          <Search />
        </header>
        <button
          onClick={() => setShowModal(true)}
          aria-label="open create tag modal"
        >
          New tag
        </button>

        <ul className="tagList">
          {range.map((tag) => (
            <Link
              className={tag?.new ? "tag newTag" : "tag"}
              key={tag.tagName}
              to={`/admin/tags/${tag.tagName}`}
            >
              <li>
                <h3>{tag.tagName}</h3>
                <p>No. articles {tag._count?.articles || 0}</p>
              </li>
            </Link>
          ))}
        </ul>
        <PageNums
          itemsPerPage={perPage}
          itemCount={tags.length}
          setItemRange={handleRange}
        />
      </TagsMain>
      {showModal &&
        createPortal(
          <TagModal
            onClose={() => setShowModal(false)}
            setTags={handleSetTags}
          />,
          document.body,
        )}
    </>
  );
}

const TagsMain = styled.main`
  ${Content}
  padding: 15px 65px;
  grid-template-rows: 2fr 1fr 10fr;
  gap: 15px;

  header {
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    font-size: 0.5em;
    align-items: center;
    border-bottom: 1px solid white;
    padding-bottom: 20px;
  }

  h1 {
    font-size: 6em;
    color: white;
    font-weight: 100;
  }

  header + button {
    ${Button}
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .tagList {
    grid-column: 1 / -1;
    grid-row: 3 / 4;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: max-content;
    gap: 20px 40px;
    list-style: none;
  }

  .tag {
    background-color: whitesmoke;
    padding: 15px;
    border-radius: 15px;
    box-shadow:
      rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    height: 90px;

    h3 {
      border-bottom: 0.75px solid;
      font-size: 1rem;
      font-weight: 450;
    }

    p {
      font-size: 0.8rem;
      font-weight: 350;
      font-style: italic;
    }
  }

  .newTag {
    ${GrowFromMiddle}
    animation: GrowFromMiddle 0.45s ease-out;
  }
`;
export default Tags;
