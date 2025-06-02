import React from "react";

const Avatar = ({ imageUrl }) => {
  //this is avatart components
  return (
    <div
      className="avatar"
      style={{
        margin: "20px",
        width: "100px",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{
          borderRadius: "50%",
          width: "100%",
          border: "2px solid black",
        }}
        src={imageUrl}
        alt=""
      />
    </div>
  );
};

export default Avatar;
