import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "antd";

const AddTask = ({fetchTasks}) => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    status: "",
  });
  
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        console.log("Task added:", data);
        navigate("/");
      })
      .catch((error) => {
        alert("Error adding task:", error);
        console.error("Error adding task:", error);
      });

    event.target.reset();
  };
  return (
    <DIV className="form-container">
      <div className="back-to-home-container">
        <Link to="/">
          <Button type="primary" className="back-to-home-button">
            Back to Home
          </Button>
        </Link>
      </div>
      <h1>Add Task</h1>
      <form
        onSubmit={handleSubmit}
        id="addTaskForm"
        action="http://localhost:5000/api/tasks"
        method="POST"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          required
          onChange={handleChange}
        ></textarea>
        <select name="status" required onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  #addTaskForm {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    gap: 10px;
    background-color: #f9f9f9;
    align-items: center;
    padding: 2rem;
    border-radius: 10px;
  }
  #addTaskForm input,
  #addTaskForm textarea,
  #addTaskForm select,
  #addTaskForm button {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: fit-content;
    max-width: 400px;
  }
`;

export default AddTask;
