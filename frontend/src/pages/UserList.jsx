import React, { useEffect, useState } from "react";
import { backendAPI } from "../api/AxiosConfig";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/DateFormatting";

const UserList = () => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get_users = async () => {
      try {
        const { data } = await backendAPI.get("/profiles/");
        setUsers(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    get_users();
  }, []);

  if (loading) {
    return;
  }

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Member since</th>
            <th>Bio</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, i) => (
            <tr key={i}>
              <td>{user.owner}</td>
              <td>
                <img
                  src={user.avatar}
                  alt={`${user.username}'s avatar`}
                  className="avatar"
                />
              </td>
              <td>
                <Link to={`/u/${user.username}`}>{user.username}</Link>
              </td>
              <td>{formatDate(user.created)}</td>
              <td>{user.bio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
