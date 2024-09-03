import styled from "styled-components";
import { Shared } from "../sharedStyles";
import { useEffect, useMemo, useState } from "react";

function Comments() {
  const [comments, setComments] = useState(null);
  const [filterBad, setFilterBad] = useState(true);

  const filteredComments = useMemo(() => {
    if (comments) {
      return comments.recent.filter((comment) => comment.review === false);
    }
  }, [comments]);

  useEffect(() => {
    async function fetchComments() {
      const token = localStorage.getItem("accessToken");
      const res = await Promise.all([
        fetch("/api/user/admin/comments/recent", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("/api/user/admin/comments/review", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);
      if (res[0].ok && res[1].ok) {
        const { recent } = await res[0].json();
        const { review } = await res[1].json();
        setComments({ recent, review });
      }
    }
    fetchComments();
  }, []);
  if (comments === null) return <CommentsCard />;

  const recentComments = filterBad ? filteredComments : comments.recent;

  return (
    <CommentsCard>
      <RecentComments>
        <h3>Recent Comments</h3>
        <label htmlFor="filterBad">Filter bad</label>
        <input
          type="checkbox"
          name="filterBad"
          id="filterBad"
          checked={filterBad}
          onChange={() => setFilterBad(!filterBad)}
        />
        {comments.recent.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          recentComments.map((com) => (
            <div key={com.id}>
              <p>
                {com.author.username}: {com.text}
              </p>
              <p>
                {new Date(com.created).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          ))
        )}
      </RecentComments>
      <div>
        <h3>Suggested Review</h3>
        {comments.review.map((com) => (
          <div key={com.id}>
          <p>
            {com.author.username}: {com.text}
          </p>
          <p>
            {new Date(com.created).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
        ))}
      </div>
    </CommentsCard>
  );
}

export default Comments;

const CommentsCard = styled.section`
  ${Shared};
  display: flex;

  div {
  padding: 10px;}
`;

const RecentComments = styled.div`
display: flex;
flex-direction: column;
border-right: 0.75px solid black;
`;
