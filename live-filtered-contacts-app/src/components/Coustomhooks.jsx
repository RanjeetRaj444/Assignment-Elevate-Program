import React, { useState } from "react";

const Coustomhooks = (initialValue) => {
  // console.log(initialValue);

  const [count, setCount] = useState(initialValue);
  function updateCount(num = 1) {
    // console.log(num);

    setCount((pre) => pre + num);
  }
  return [count, updateCount];
};

export default Coustomhooks;
