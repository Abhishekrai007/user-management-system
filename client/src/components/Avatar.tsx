import React from "react";

interface AvatarProps {
  username: string;
  profilePicture?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  username,
  profilePicture,
  size = 40,
}) => {
  const firstLetter = username.charAt(0).toUpperCase();

  const avatarStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: `${size / 2}px`,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#007bff",
    marginRight: "10px",
  };

  if (profilePicture) {
    return <img src={profilePicture} alt={username} style={avatarStyle} />;
  }

  return <div style={avatarStyle}>{firstLetter}</div>;
};

export default Avatar;
