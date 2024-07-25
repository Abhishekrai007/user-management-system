import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const deleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            <Link to={`/profile/${u._id}`}>{u.username}</Link> - {u.email} -{" "}
            {u.role}
            {user && (user.role === "admin" || user._id === u._id) && (
              <>
                <Link to={`/edit-user/${u._id}`}> Edit </Link>
                {user.role === "admin" && (
                  <button onClick={() => deleteUser(u._id)}> Delete </button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
