import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to User Management System</h1>
      {user ? (
        <div>
          <p>Hello, {user.username}!</p>
          <p>Your role: {user.role}</p>
          <Link to="/users">View User List</Link>
        </div>
      ) : (
        <div className="links">
          <p>Please log in or register to access the system.</p>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
