import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Button, Content, GrowFromMiddle } from "../../components/sharedStyles";
import Search from "../../components/Searchbar.jsx";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import TagModal from "../../components/TagModal";
import PageNums from "../../components/Pagination";
import { IoTrashBinOutline } from "react-icons/io5";
import ConfirmModal from "../../components/ConfirmDeleteModal.jsx";
import { deleteTag } from "../../api/api-tag.js";
import { tagsLoader } from "../router/loaders.js";
import ClipLoader from "react-spinners/ClipLoader";



function Tags() {
  const perPage = 9;
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState([0, perPage]);
  const tagNameRef = useRef(null);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getTags() {
      const tagData = await tagsLoader(signal);
      if (tagData) {
        setTags(tagData);
        setLoading(false);
      }
    }

    if (!tags && loading) {
      getTags();
    }
    return () => {
      controller.abort();
    };
  }, [tags, loading]);

  if (loading) return <ClipLoader color="white" cssOverride={{ alignSelf: "center", justifySelf: "center" }} />;

  function handleSetTags(newTag) {
    setTags([...tags, { tagName: newTag, new: true }]);
  }

  function handleDelete({ target }) {
    const { id: tagName } = target;
    tagNameRef.current = tagName;
    setShowModal(true);
    setShowCreateModal(false);
  }

  async function handleDeleteTag(id) {
    const deleted = await deleteTag(id);

    if (deleted) {
      setTimeout(() => {
        setShowModal(false);
        setShowCreateModal(true);
        setTags(tags.filter((tag) => tag.tagName !== tagNameRef.current));
      }, 2100);
      return true;
    }
    return false;
  }

  function handleRange(i, j) {
    setRange([i, j]);
  }
  //outlet renders specific tag page
  const pathArray = location.pathname.slice(1).split("/");
  if (pathArray.length > 2)
    return <Outlet context={pathArray[2].split("%20").join(" ")} />;

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
          {tags.slice(range[0], range[1]).map((tag) => (
            <div className="tag-container" key={tag.tagName}>
              <button
                onClick={handleDelete}
                className="delete"
                id={tag.tagName}
              >
                <IoTrashBinOutline />
              </button>
              <Link
                className={tag?.new ? "tag newTag" : "tag"}
                to={`/admin/tags/${tag.tagName}`}
              >
                <li>
                  <h3>{tag.tagName}</h3>
                  <p>No. articles {tag._count?.articles || 0}</p>
                </li>
              </Link>
            </div>
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
          showCreateModal ? (
            <TagModal
              onClose={() => setShowModal(false)}
              setTags={handleSetTags}
            />
          ) : (
            <ConfirmModal
              title={tagNameRef.current}
              deleteFunction={handleDeleteTag}
              onClose={() => {
                setShowModal(false);
                setShowCreateModal(true);
              }}
              id={tagNameRef.current}
            />
          ),
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

  .tag-container {
    position: relative;
  }

  .tagList {
    grid-column: 1 / -1;
    grid-row: 3 / 4;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: max-content;
    gap: 20px 40px;
    list-style: none;

    @media only screen and (max-width: 850px) {
      grid-template-columns: 1fr 1fr;
    }

    @media only screen and (max-width: 670px) {
      grid-template-columns: 1fr;
    }
  }

  .delete {
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;

    &:hover {
      color: red;
    }

    svg {
      pointer-events: none;
    }
  }

  .tag {
    display: flex;
    flex-direction: column;
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
