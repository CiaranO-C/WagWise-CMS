import styled from "styled-components";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import { BsFlag, BsFlagFill } from "react-icons/bs";
import { Button } from "../components/sharedStyles";
import { useState } from "react";

function CommentCard({ comment, deleteComment, toggleFlag }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const flagged = comment.review;

  const created = new Date(comment.created).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Card>
      <div className="comment-info">
        <p className="username">{comment.author.username}</p>
        <p className="text">{comment.text}</p>
        <p className="date">{created}</p>
        <p className="article">{comment.article.title}</p>
      </div>

      <div className="flags">
        <button
          onClick={() => toggleFlag(comment.id)}
          className={flagged ? "flagged" : "ok"}
          aria-label={flagged ? "unflag comment" : "flag comment"}
        >
          {flagged ? <BsFlagFill /> : <BsFlag />}
        </button>
      </div>
      <div className="delete-container">
        {confirmDelete ? (
          <div className="confirm-container">
            <button
              className="confirm-delete"
              onClick={() => setConfirmDelete(false)}
            >
              <IoIosClose />
            </button>
            <button
              data-testid="confirm-delete"
              className="confirm-delete"
              onClick={() => deleteComment(comment.id)}
            >
              <IoIosCheckmark />
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirmDelete(true)} className="delete">
            Delete
          </button>
        )}
      </div>
    </Card>
  );
}

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  color: black;
  min-height: 90px;

  &:nth-child(even) > div {
    background-color: #dddddd;
  }

  .comment-info {
    background-color: white;
    display: grid;
    grid-template-columns: auto 1fr 0.5fr;
    grid-template-rows: 1fr auto;
    align-items: center;
    column-gap: 15px;
    z-index: 3;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) -3px 0px 0px inset;
    padding: 10px;
    border-radius: 10px;

    .username {
      font-weight: 600;
    }

    .date {
      font-style: italic;
      font-size: 0.7rem;
      align-self: end;
      grid-column: 1 / 2;
    }

    .text {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
      align-self: start;
      font-weight: 200;
    }

    .article {
      grid-column: 3 / 4;
      grid-row: 1 / 3;
      align-self: center;
    }
  }

  .utils {
    display: flex;
    gap: 15px;

    .confirm-container {
      display: flex;
      gap: 5px;
      width: 64px;
    }
  }

  .delete,
  .confirm-delete {
    ${Button}
  }

  .delete {
    width: 64px;
  }

  .confirm-delete {
    position: relative;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .flags {
    background-color: white;
    display: flex;
    gap: 10px;
    z-index: 2;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) -3px 0px 0px inset;
    padding: 0px 17px 0px 25px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    width: 120%;
    justify-content: center;
    justify-self: end;

    button {
      background: none;
      border: none;
      cursor: pointer;
    }

    svg {
      width: 25px;
      height: 25px;
    }

    .flagged {
      color: red;
    }

    .ok {
      color: green;
    }
  }

  .delete-container {
    z-index: 1;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) -3px 0px 0px inset;
    padding: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    width: 120%;
    justify-content: flex-end;
    justify-self: end;
    background-color: #ffffff;
    display: flex;

    .confirm-container {
      display: flex;
      justify-content: space-between;
      width: 64px;
      .confirm-delete {
        display: flex;
        align-items: center;
        width: 45%;
      }

      svg {
        width: 25px;
        height: 25px;
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
      }
    }
  }

  .divider {
    border: 0.75px solid white;
  }

  & .comment-info {
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.01);
    }
  }

  & > *:hover {
  }
`;

export default CommentCard;
