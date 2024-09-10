import styled from "styled-components";
import { Card } from "../sharedStyles";
import { useEffect, useState } from "react";

function Stats() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/user/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const { users } = await res.json();
      setUsers(users);
    }
    fetchUsers();
  }, []);

  if (users === null) return <StatsCard />;

  return (
    <StatsCard>
      <h2>
        User
        <br />
        Stats
      </h2>
      <div className="info">
        <h3>
          Users
          <div className="dot" />
        </h3>
        <h3>
          Likes
          <div className="dot" />
        </h3>
        <h3>
          Comments
          <div className="dot" />
        </h3>
        <p>{users.length}</p>
        <p>32</p>
        <p>17</p>
      </div>
    </StatsCard>
  );
}

export default Stats;
const StatsCard = styled.section`
  ${Card}
  display: flex;
  align-items: center;

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
    }
  }
`;
