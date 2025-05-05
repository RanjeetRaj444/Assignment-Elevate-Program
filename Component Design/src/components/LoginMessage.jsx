import React from "react";

const LoginMessage = ({ isLoggedIn }) => {
  return (
    <div>
      <h3 style={{ color: "Red" }}>Login Message Component</h3>
      {isLoggedIn ? (
        <p style={{ color: "green" }}>Welcome back, User!.</p>
      ) : (
        <p style={{ color: "red" }}>Please log in.</p>
      )}
    </div>
  );
};

export default LoginMessage;
