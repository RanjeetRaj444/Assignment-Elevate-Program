import React from "react";
import UserProfile from "./UserProfile";

const UserDashboard = ({
  name,
  age,
  email,
  imageUrl,
  bio,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  return (
    <div style={{ padding: "20px", backgroundColor: "wheat" }}>
      <h1>User Dashboard</h1>
      {isLoggedIn ? (
        <UserProfile user={{ name, email, bio, imageUrl }} />
      ) : (
        <div style={{ padding: "20px" }}>
          <h2 style={{ color: "red" }}>You need to log in</h2>
        </div>
      )}
      <button
        style={{
          padding: ".5rem 1rem",
          borderRadius: ".5rem",
          width: "fit-content",
        }}
        onClick={() => setIsLoggedIn(!isLoggedIn)}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default UserDashboard;
