import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
const Edit = ({ id, fetchTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  function handleChange(e) {
    console.log({ [e.target.name]: e.target.value });
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }

  const handleOk = () => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEditData(data);
        fetchTasks();
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      fetch(`http://localhost:5000/api/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setEditData(data);
        });
    }
  }, [isModalOpen]);

  return (
    <>
      <Button style={{ backgroundColor: "green" }} onClick={showModal}>
        Edit
      </Button>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label>Title</label>
          <Input
            name="title"
            value={editData.title}
            placeholder="Title"
            onChange={handleChange}
          />
          <label>Description</label>
          <Input
            name="description"
            value={editData.description}
            placeholder="Description"
            onChange={handleChange}
          />
          <label>Status</label>
          <select
            name="status"
            onChange={handleChange}
            style={{ padding: ".5rem", borderRadius: ".5rem" }}
          >
            <option value={editData.status}>{editData.status}</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
