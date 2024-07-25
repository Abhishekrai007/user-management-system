import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/profile/${user._id}`}>{user.username}</Link> -{" "}
            {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
