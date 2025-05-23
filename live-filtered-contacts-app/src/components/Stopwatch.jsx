import React, { useState } from "react";

const Stopwatch = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSedconds] = useState(0);
  return (
    <div>
      <h3>
        {hours}:{minutes}:{seconds}
      </h3>
      <button>Start</button>
      <button>Stop</button>
      <button>Reset</button>
    </div>
  );
};

export default Stopwatch;
