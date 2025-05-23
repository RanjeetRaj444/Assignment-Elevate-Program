import React, { useState } from "react";
import "../styles/drawer.css";
const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="body">
        <button onClick={() => setIsOpen(!isOpen)}>Drawer</button>
      </div>
      <div
        className={`back ${isOpen ? "open-back" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <button onClick={() => setIsOpen(false)}>❌</button>
      </div>
    </div>
  );
};

export default Drawer;
