import { useLoaderData, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Content } from "../sharedStyles";
import { useMemo, useState } from "react";
import CommentCard from "../components/CommentCard";

function Comments() {
  const location = useLocation();
  const { comments: initialComments } = useLoaderData();
  console.log(initialComments);

  const [comments, setComments] = useState(initialComments);
  const [filterComments, setFilterComments] = useState(checkParams());
  const [errors, setErrors] = useState(null);

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
    console.log(id);

    const token = localStorage.getItem("accessToken");
    const res = await fetch(`/api/user/admin/comments/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
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
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`/api/user/admin/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setComments((c) => c.filter((c) => c.id !== id));
    }
  }

  async function handleDeleteFlagged() {
    if (filteredComments.length) {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`/api/user/admin/comments`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setComments((c) => c.filter((c) => c.review === false));
        setErrors(null);
      }
    } else {
      setErrors("No flagged comments found");
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
    <CommentsSection>
      <Header>
        <h1>Comments</h1>
      </Header>
      <CommentsContent>
        {!filterComments ? (
          <button onClick={handleSetFilter}>Flagged Only</button>
        ) : (
          <button onClick={() => setFilterComments(false)}>All comments</button>
        )}
        <button onClick={handleDeleteFlagged}>Delete All Flagged</button>
        {errors && errors}
        {display.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            deleteComment={handleDeleteComment}
            toggleFlag={handleUpdateFlag}
          />
        ))}
      </CommentsContent>
    </CommentsSection>
  );
}

export default Comments;

const CommentsSection = styled.section`
  ${Content}
  padding: 15px 65px;
  grid-template-rows: 2fr 1fr 10fr;
  gap: 15px;
`;

const Header = styled.header`
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  font-size: 0.5em;
  align-items: center;
  border-bottom: 1px solid white;
  padding-bottom: 20px;

  h1 {
    font-size: 6em;
    color: white;
    font-weight: 100;
  }
`;

const CommentsContent = styled.div``;
