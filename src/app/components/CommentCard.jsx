import styled from "styled-components";
import { TbFlag2, TbFlag2Off } from "react-icons/tb";
import { Button } from "../sharedStyles";
import { useState } from "react";

function CommentCard({ comment, deleteComment, toggleFlag }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const flagged = comment.review;
  console.log("flagged -->", flagged);
  
  const created = new Date(comment.created).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Card>
      <div className="comment-info">
        <h3>{comment.article.title}</h3>
        <p>{comment.author.username}</p>
        <p>{comment.text}</p>
        <p>{created}</p>
      </div>
      <div className="utils">
        {confirmDelete ? (
          <>
            <button className="delete" onClick={() => setConfirmDelete(false)}>Cancel</button>
            <button className="delete" onClick={() => deleteComment(comment.id)}>Confirm</button>
          </>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="delete">
            Quick Delete
          </button>
        )}
        <div className="flags">
          <button
            onClick={() => toggleFlag(comment.id)}
            className={flagged ? "active" : undefined}
            disabled={flagged}
          >
            <TbFlag2 />
          </button>
          <div className="divider" />
          <button
            onClick={() => toggleFlag(comment.id)}
            className={!flagged ? "active" : undefined}
            disabled={!flagged}
          >
            <TbFlag2Off />
          </button>
        </div>
      </div>
    </Card>
  );
}

const Card = styled.div`
  color: white;

  .comment-info {
  }

  .utils {
  }

  .delete {
    ${Button}
  }

  .flags {
    display: flex;
    gap: 10px;

    button {
      background: none;
      border: none;
      cursor: pointer;
    }

    svg {
      width: 25px;
      height: 25px;
    }

    .active {
      color: orange;
      cursor: default;
    }
  }

  .divider {
    border: 0.75px solid white;
  }
`;

export default CommentCard;
