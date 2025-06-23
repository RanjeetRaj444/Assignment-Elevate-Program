import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import fs from "fs";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend URL in production
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(express.static("public"));

// In-memory room storage
const rooms = new Map();

// Generate unique user colors
const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FECA57",
  "#FF9FF3",
  "#54A0FF",
  "#5F27CD",
  "#00D2D3",
  "#FF9F43",
];
let colorIndex = 0;

// Room initialization
function getRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      code: `// Welcome to the collaborative code editor!\n// Start typing to see real-time collaboration in action\n\nconsole.log("Hello, collaborative world!");`,
      users: new Map(),
      cursors: new Map(),
      history: [],
    });
  }
  return rooms.get(roomId);
}

// Socket.IO handlers
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (data) => {
    const { roomId, username } = data;
    const room = getRoom(roomId);

    // Leave all previous rooms except its own ID room
    for (const joinedRoom of socket.rooms) {
      if (joinedRoom !== socket.id) {
        socket.leave(joinedRoom);
      }
    }

    // Join new room
    socket.join(roomId);
    socket.roomId = roomId;
    socket.username = username;

    // Assign color to user
    const userColor = colors[colorIndex % colors.length];
    colorIndex++;

    // Store user info
    room.users.set(socket.id, {
      id: socket.id,
      username,
      color: userColor,
      joinedAt: Date.now(),
    });

    // Send initial state to new user
    socket.emit("code-sync", {
      code: room.code,
      users: Array.from(room.users.values()),
      cursors: Array.from(room.cursors.values()),
    });

    // Notify others
    socket.to(roomId).emit("user-joined", {
      user: room.users.get(socket.id),
      users: Array.from(room.users.values()),
    });

    console.log(`${username} joined room ${roomId}`);
  });

  socket.on("code-change", (data) => {
    if (!socket.roomId) return;

    const room = getRoom(socket.roomId);
    const { operation, content } = data;

    // Update code and history
    room.code = content;
    room.history.push({
      userId: socket.id,
      username: socket.username,
      operation,
      content,
      timestamp: Date.now(),
    });

    if (room.history.length > 1000) {
      room.history = room.history.slice(-500);
    }

    // Broadcast change
    socket.to(socket.roomId).emit("code-change", {
      operation,
      content,
      userId: socket.id,
      username: socket.username,
    });
  });

  socket.on("cursor-position", (data) => {
    if (!socket.roomId) return;

    const room = getRoom(socket.roomId);
    const user = room.users.get(socket.id);

    if (user) {
      const cursorData = {
        userId: socket.id,
        username: user.username,
        color: user.color,
        position: data.position,
        selection: data.selection,
      };

      room.cursors.set(socket.id, cursorData);

      socket.to(socket.roomId).emit("cursor-update", cursorData);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (socket.roomId) {
      const room = getRoom(socket.roomId);

      room.users.delete(socket.id);
      room.cursors.delete(socket.id);

      socket.to(socket.roomId).emit("user-left", {
        userId: socket.id,
        users: Array.from(room.users.values()),
      });

      if (room.users.size === 0) {
        rooms.delete(socket.roomId);
        console.log(`Room ${socket.roomId} cleaned up`);
      }
    }
  });
});

// --- Run Code API ---
app.post("/api/run", (req, res) => {
  const code = req.body.code;
  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Code is required." });
  }

  // Write code to temp file
  const tempFilePath = path.join(os.tmpdir(), `run-${Date.now()}.js`);
  fs.writeFileSync(tempFilePath, code);

  // Execute code
  exec(`node "${tempFilePath}"`, { timeout: 3000 }, (err, stdout, stderr) => {
    fs.unlinkSync(tempFilePath); // Cleanup

    res.json({
      output: stdout || "",
      error: stderr || (err && err.message) || "",
    });
  });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

