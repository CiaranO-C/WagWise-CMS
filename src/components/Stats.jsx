import styled from "styled-components";
import { Card } from "../app/sharedStyles";
import { useEffect, useState } from "react";

function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!stats) {
      async function fetchUsers() {
        const token = localStorage.getItem("accessToken");
        const res = await fetch("/api/user/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { users } = await res.json();
        const [comments, likes] = countStats(users);

        setStats({ users: users.length, comments, likes });
      }
      fetchUsers();
    }
  }, [stats]);

  function countStats(users) {
    let commentCount = 0;
    let likeCount = 0;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      commentCount += user.comments.length;
      likeCount += user.likes.length;
    }
    return [commentCount, likeCount];
  }

  if (stats === null) return <StatsCard />;

  return (
    <StatsCard>
      <h2>
        User
        <br />
        Stats
      </h2>
      <div className="info">
        <h3 className="users">
          Users
          <div className="dot users" />
        </h3>
        <h3>
          Likes
          <div className="dot" />
        </h3>
        <h3>
          Comments
          <div className="dot" />
        </h3>
        <p className="users">{stats.users}</p>
        <p>{stats.likes}</p>
        <p>{stats.comments}</p>
      </div>
    </StatsCard>
  );
}

export default Stats;
const StatsCard = styled.section`
  ${Card}
  display: flex;
  align-items: center;
  user-select: none;
  cursor: default;

  h2 {
    padding-right: 10px;
  }

  .info {
    flex: 1;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    border-left: 0.75px solid;
    justify-items: center;

    h3,
    p {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      position: relative;
      border-bottom: 0.75px solid;
      width: 100%;
    }

    .dot {
      position: absolute;
      background-color: #484848;
      border-radius: 50%;
      width: 7px;
      height: 7px;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      bottom: 0px;
      transform: translateY(50%);
      transition: background-color 0.2s ease-out;
    }

    h3:hover {
      div {
        background-color: orange;
      }
    }
  }
`;
