import React from "react";
import Coustomhooks from "./Coustomhooks";

const Counter = () => {
      const [count, updateCount] = Coustomhooks(0);
  return (
    <div>
      {" "}
      <h1>{count}</h1>
      <button onClick={() => updateCount(5)}>Increment by 5</button>
    </div>
  );
};

export default Counter;
