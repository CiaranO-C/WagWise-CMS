import { useLoaderData, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Content, Button } from "../../components/sharedStyles";
import { useMemo, useState } from "react";
import CommentCard from "../../features/CommentCard";
import { createPortal } from "react-dom";
import ConfirmModal from "../../components/ConfirmDeleteModal";
import {
  deleteComment,
  deleteFlagged,
  updateFlag,
} from "../../api/api-comment";

function Comments() {
  const location = useLocation();
  const { comments: initialComments } = useLoaderData();
  const [comments, setComments] = useState(initialComments);
  const [filterComments, setFilterComments] = useState(checkParams());
  const [errors, setErrors] = useState(null);
  const [showModal, setShowModal] = useState(false);
  function checkParams() {
    let filter = false;

    if (location.search === "?filter=true") {
      filter = true;
    }

    return filter;
  }

  const filteredComments = useMemo(() => {
    return comments.filter((comment) => comment.review === true);
  }, [comments]);

  if (filteredComments.length === 0 && filterComments) setFilterComments(false);
  let display = filterComments ? filteredComments : comments;

  async function handleUpdateFlag(id) {
    const updated = await updateFlag(id);

    if (updated) {
      setComments((c) =>
        c.map((comment) => {
          if (comment.id === id) {
            return { ...comment, review: !comment.review }; // Create a new object to avoid mutation
          }
          return comment;
        }),
      );
    }
  }

  async function handleDeleteComment(id) {
    const deleted = await deleteComment(id);

    if (deleted) {
      setComments((c) => c.filter((c) => c.id !== id));
    }
  }

  function handleModal() {
    if (filteredComments.length) {
      setShowModal(true);
    } else {
      setErrors("No flagged comments found");
    }
  }

  async function handleDeleteFlagged() {
    const deleted = await deleteFlagged();

    if (deleted) {
      setTimeout(() => {
        setComments((c) => c.filter((c) => c.review === false));
        setErrors(null);
        setShowModal(false);
      }, 2100);
      return true;
    }
  }

  function handleSetFilter() {
    if (filteredComments.length) {
      setFilterComments(true);
      setErrors(null);
    } else {
      setErrors("No flagged comments found");
    }
  }

  return (
    <>
      <CommentsSection>
        <Header>
          <h1>Comments</h1>
        </Header>
        <CommentsContent>
          <div className="btn-container">
            {!filterComments ? (
              <button onClick={handleSetFilter}>Flagged Only</button>
            ) : (
              <button onClick={() => setFilterComments(false)}>
                All comments
              </button>
            )}
            <button onClick={handleModal}>Delete All Flagged</button>
            {errors && <span className="error-message">{errors}</span>}
          </div>
          <div className="comments-container">
            {display.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                deleteComment={handleDeleteComment}
                toggleFlag={handleUpdateFlag}
              />
            ))}
          </div>
        </CommentsContent>
      </CommentsSection>
      {showModal &&
        createPortal(
          <ConfirmModal
            title="Flagged"
            deleteFunction={handleDeleteFlagged}
            onClose={() => {
              setShowModal(false);
            }}
            id={null}
          />,
          document.body,
        )}
    </>
  );
}

export default Comments;

const CommentsSection = styled.section`
  ${Content}
  grid-template-rows: 2fr 1fr 10fr;
  gap: 15px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 1px solid white;

  h1 {
    color: white;
    font-weight: 100;
  }
`;

const CommentsContent = styled.div`
  .btn-container {
    display: flex;
    gap: 10px;

    button {
      ${Button}
    }
  }

  .error-message {
    color: white;
    align-self: center;
  }

  .comments-container {
    display: flex;
    flex-direction: column;
    margin: 15px 0px;
    gap: 10px;
  }
`;
