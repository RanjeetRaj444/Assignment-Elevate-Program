const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks.routes.js");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.json({ mes: "Welcome to the Task Management API" });
});

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.mongo_URL;

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
    console.log("server is running ");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
});
