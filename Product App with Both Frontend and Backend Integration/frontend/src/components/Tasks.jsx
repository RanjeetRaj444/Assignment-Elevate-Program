import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Edit from "./Edit";

const Tasks = ({ fetchTasks, data }) => {
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div>
      <h1>Task List</h1>
      <ul id="taskList">
        {data.length > 0 ? (
          data.map((task) => (
            <li key={task._id}>
              <h3>Title :- {task.title}</h3>
              <p>Description :- {task.description}</p>
              <p>Status :- {task.status}</p>
              <Edit id={task._id} fetchTasks={fetchTasks} />
              <Button style={{ backgroundColor: "red" }}>Delete</Button>
            </li>
          ))
        ) : (
          <li>
            <div>
              <h3>No tasks available</h3>
              <p>Please add a task to see it here.</p>
              <Link to="/add">
                <button>Add Task</button>
              </Link>
            </div>
          </li>
        )}
      </ul>

      {data.length > 0 && (
        <Link to={"/add"}>
          <Button type="primary">Add More</Button>
        </Link>
      )}
    </div>
  );
};

export default Tasks;
