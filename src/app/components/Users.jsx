import styled from "styled-components";
import { Shared } from "../sharedStyles";
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/user/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const { users } = await res.json();
      console.log(users);

      setUsers(users);
    }
    fetchUsers();
  }, []);

  if(users === null) return <UsersCard/>;

  return (
    <UsersCard>
      <h3>Users</h3>
      {users.length === 0 ? <p>No users yet</p> : users.map(user => (
        <p>{user.username}</p>
      ))}
    </UsersCard>
  );
}

export default Users;
const UsersCard = styled.section`
  ${Shared}
`;
