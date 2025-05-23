import React, { useEffect, useState } from "react";

const ContactData = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    tags: "",
    favourite: false,
    id: `${Math.random()}${Date.now()}`,
  });
  const [dataFromLocalStorage, setDatatoLocalStorage] = useState([]);
  function handleChange(e) {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setDatatoLocalStorage([...dataFromLocalStorage, contactData]);
    e.target.reset();
  }
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("assign-contact")) || [];
    setDatatoLocalStorage(data);
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "assign-contact",
      JSON.stringify(dataFromLocalStorage)
    );
  }, [dataFromLocalStorage]);
  return (
    <>
      <div className="input_container">
        <form action="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Contact"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Tags with comas"
            name="tags"
            onChange={handleChange}
          />
          <input
            type="checkbox"
            name="favourite"
            id=""
            onChange={(e) => {
              setContactData({ ...contactData, favourite: e.target.checked });
            }}
          />
          <button>Submit</button>
        </form>
      </div>
      <div
        className="card-container"
        style={{
          padding: "1rem",
          borderRadius: ".5rem",
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gridGap: "2rem",
        }}
      >
        {dataFromLocalStorage.length > 0 &&
          dataFromLocalStorage.map((ele) => (
            <div
              key={ele.id}
              style={{
                backgroundColor: "lightgrey",
                padding: "1rem",
                borderRadius: ".5rem",
              }}
            >
              <h3>{ele.name}</h3>
              <h4>{ele.email}</h4>
              <p
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto auto",
                }}
              >
                Tags :-
                {ele.tags.split(",").map((ele, ind) => {
                  // console.log(ele);
                  return (
                    <span
                      style={{
                        backgroundColor: "teal",
                        padding: ".5rem",
                        margin: ".5rem",
                        borderRadius: ".5rem",
                      }}
                      key={ind}
                    >
                      {ele}
                    </span>
                  );
                })}
              </p>
              <p>favourite :- {ele.favourite ? "YES" : "NO"}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default ContactData;
