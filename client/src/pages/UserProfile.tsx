import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/Avatar";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const UserProfile: React.FC = () => {
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();
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
      setProfileUser(response.data);
    } catch (error) {
      console.error("error fetching user profile:", error);
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        window.location.href = "/users";
      } catch (error) {
        console.error("eror deleting user:", error);
      }
    }
  };

  if (!profileUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <Avatar
        username={profileUser.username}
        profilePicture={profileUser.profilePicture}
      />
      <div className="user-details">
        <p>Username: {profileUser.username}</p>
        <p>Email: {profileUser.email}</p>
        <p>Role: {profileUser.role}</p>
      </div>
      <div className="user-actions">
        {user && (user.role === "admin" || user.id === profileUser._id) && (
          <Link to={`/edit-user/${profileUser._id}`}>Edit Profile</Link>
        )}
        {user && user.role === "admin" && (
          <button onClick={handleDeleteUser}>Delete User</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
