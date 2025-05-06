import Tasks from "./components/Tasks";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import React from "react";

function App() {
  const [data, setData] = React.useState([]);
  function fetchTasks() {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        setData(data.tasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }
  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Tasks data={data} fetchTasks={fetchTasks} />}
          />
          <Route path="/add" element={<AddTask fetchTasks={fetchTasks} />} />
          {/* <Route path="/edit/:id" element={<EditTask />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
