import React, { use } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Greeting from "./components/Greeting";
import UserProfile from "./components/UserProfile";
import UserDashBoard from "./components/UserDashBoard";

function App() {
  const [name, setName] = React.useState("John Doe");
  const [timeOfDay, setTimeOfDay] = React.useState("Good Morning");
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [user, setUser] = React.useState({
    name: "John Doe",
    email: "jhondode@gmail.com",
    bio: "This is my bio.",
    imageUrl:
      "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740",
  });
  const [age, setAge] = React.useState(25);

  return (
    <>
      <h1>Component Design</h1>
      <div
        style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "auto auto auto",
        }}
      >
        <Greeting
          name={name}
          timeOfDay={timeOfDay}
          setTimeOfDay={setTimeOfDay}
        />
        <UserProfile user={user} />
        <Dashboard />
      </div>
      <div>
        <UserDashBoard
          name={user.name}
          age={age}
          email={user.email}
          imageUrl={user.imageUrl}
          bio={user.bio}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
    </>
  );
}

export default App;
