import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import Edit from "./Edit";

const Tasks = ({ fetchTasks, data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchTasks();
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Task List</h1>
      <ul id="taskList">
        {data.length > 0 ? (
          data.map((task) => (
            <li key={task._id}>
              <h3>Title :- {task.title}</h3>
              <p>Description :- {task.description}</p>
              <p>Status :- {task.status}</p>
              <Edit id={task._id} fetchTasks={fetchTasks} />
              <Button onClick={showModal} style={{ backgroundColor: "red" }}>
                Delete
              </Button>
              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={() => handleOk(task._id)}
                onCancel={handleCancel}
              >
                <h1>
                  Are you sure want to{" "}
                  <strong>
                    <span style={{ color: "red" }}>DELETE</span>
                  </strong>{" "}
                  ?
                </h1>
              </Modal>
            </li>
          ))
        ) : (
          <li style={{ background: "lightcyan"}}>
            <div>
              <h3>No tasks available</h3>
              <p>Please add a task to see it here.</p>
              <Link to="/add">
                <Button type="primary">Add Task</Button>
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
