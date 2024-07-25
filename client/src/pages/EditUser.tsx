import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EditUser: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userData = response.data;
      setUsername(userData.username);
      setEmail(userData.email);
      setRole(userData.role);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedUser =
        user?.role === "admin"
          ? { username, email, role }
          : { username, email };
      await axios.put(`http://localhost:5000/api/users/${id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  if (user.role !== "admin" && user.id !== id) {
    return <div>You don't have permission to edit this user.</div>;
  }

  return (
    <form className="edit-user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      {user.role === "admin" && (
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )}
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;
