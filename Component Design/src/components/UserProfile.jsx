import React from "react";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";

const UserProfile = ({ user }) => {
  return (
    <div
      style={{ padding: "20px", backgroundColor: "#f0f0f0", margin: "20px" }}
    >
      <h1>User Profile Component</h1>
      <Avatar imageUrl={user.imageUrl} />
      <UserInfo name={user.name} email={user.email} bio={user.bio} />
    </div>
  );
};

export default UserProfile;
