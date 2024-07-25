import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  profilePicture?: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, users]);

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

  const filterUsers = () => {
    const filtered = users.filter(
      (u) =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
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
    <div className="user-list">
      <h2>User List</h2>
      <input
        className="search-input"
        type="text"
        placeholder="Search by username or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredUsers.map((u) => (
          <li
            key={u._id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Avatar
              username={u.username}
              profilePicture={u.profilePicture}
              size={40}
            />
            <div>
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
