import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../../components/sharedStyles";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { createPortal } from "react-dom";
import TagModal from '../../components/TagModal';

function CreateItemCard({ setTags }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <CreateItemSection>
        <Link to="/admin/new_article">
          <div>
            <h2>New article</h2>
            <CiCirclePlus />
          </div>
        </Link>
        <div
          onClick={() => setShowModal(true)}
          aria-label="open create tag modal"
        >
          <h2>New Tag</h2>
          <CiCirclePlus />
        </div>
      </CreateItemSection>
      {showModal &&
        createPortal(
          <TagModal onClose={() => setShowModal(false)} setTags={setTags} />,
          document.body,
        )}
    </>
  );
}

const CreateItemSection = styled.section`
  ${Card}
  height: 80px;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 15px 0px;

  & *:hover {
    color: #519500;
  }

  a,
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100%;
    width: 100%;
  }

  a + div {
    cursor: pointer;
    border-left: 0.75px solid black;
  }

  svg {
    width: 25px;
    height: 25px;
  }
`;

export default CreateItemCard;
