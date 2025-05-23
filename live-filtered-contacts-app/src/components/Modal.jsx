import React, { useState } from "react";
import "../styles/modal.css";
const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="main">
      <div className="body">
        <button onClick={() => setIsOpen(!isOpen)}>Open</button>
      </div>
      <div
        className={`back ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <button onClick={() => setIsOpen(!isOpen)}>Cancle</button>
        <button onClick={() => setIsOpen(!isOpen)}>Save</button>
      </div>
    </div>
  );
};

export default Modal;
