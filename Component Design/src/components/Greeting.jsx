import React from "react";

const Greeting = ({ name, timeOfDay, setTimeOfDay }) => {
  const [time, setTime] = React.useState("Good Morning");
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>Greeting Component</h1>
      <h3 style={{ color: "blue" }}>
        {timeOfDay} , {name}
      </h3>
      <select
        style={{
          padding: ".5rem 1rem",
          borderRadius: ".5rem",
          width: "fit-content",
        }}
        name=""
        id=""
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="Good morning">Morning</option>
        <option value="Good afternoon">Afternoon</option>
        <option value="Good evening">Evening</option>
        <option value="Good night">Night</option>
      </select>
      <button
        style={{
          padding: ".5rem 1rem",
          borderRadius: ".5rem",
          width: "fit-content",
        }}
        onClick={() => setTimeOfDay(time)}
      >
        Change Time of Day
      </button>
    </div>
  );
};

export default Greeting;
