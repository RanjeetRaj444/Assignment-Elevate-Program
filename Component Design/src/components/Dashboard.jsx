import React from "react";
import LoginMessage from "./LoginMessage";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [user, setUser] = React.useState({ name: "John Doe", email: "" });
  return (
    <div
      className="dashboard"
      style={{ padding: "20px", backgroundColor: "#f0f0f0", margin: "20px" }}
    >
      <h1>Dashboard Component</h1>
      <LoginMessage isLoggedIn={isLoggedIn} />
      <button
        onClick={() => setIsLoggedIn(!isLoggedIn)}
        style={{ padding: ".5rem 1rem", borderRadius: ".5rem" }}
      >
        Toggle
      </button> 
    </div>
  );
};

export default Dashboard;
