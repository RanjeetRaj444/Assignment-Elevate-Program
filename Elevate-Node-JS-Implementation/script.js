// Q: 1
// File System Operations
// 1. Directory Size Calculator Implement calculateDirSize(dirPath) that recursively calculates the total size of all files in a directory and its subdirectories.
//  answer :-

const fs = require("fs");
const path = require("path");

function calculateDirSize(dirPath) {
  let totalSize = 0;
  function recurse(currentPath) {
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
      const fullPath = path.join(currentPath, file);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        recurse(fullPath);
      } else {
        totalSize += stats.size;
      }
    }
  }
  recurse(dirPath);
  return totalSize;
}

// 2. File Backup Creator Create backupFile(filePath) that creates a backup copy of a file with timestamp in the filename (e.g., document_2024-06-24_10-30.txt).

//  answer :-
function backupFile(filePath) {
  const stats = fs.statSync(filePath);
  const timestamp = new Date(stats.mtime).toISOString().replace(/[:.-]/g, "_"); //get help from gpt
  const backupPath = `${filePath}_${timestamp}`;
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

// HTTP/API Related
// 3. Basic Rate Limiter Implement a middleware function that limits requests to 10 per minute per IP address using in-memory storage.

const rateLimit = {};

function rateLimitMiddleware(req, res, next) {
  //have taken help from gpt for some part of the code
  const ip = req.ip;
  const timestamp = new Date().toISOString();
  if (!rateLimit[ip]) {
    rateLimit[ip] = [];
  }
  rateLimit[ip].push(timestamp);
  rateLimit[ip] = rateLimit[ip].filter(
    (time) => new Date(time) > new Date(Date.now() - 60 * 1000)
  );
  if (rateLimit[ip].length > 10) {
    return res.status(429).json({ error: "Too many requests" });
  }
  next();
}

// 4. Request Logger Create middleware that logs all incoming HTTP requests with timestamp, method, URL, and response time to a file.

const fs = require("fs");
const path = require("path");

function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${req.method} ${req.url} - ${res.statusCode}`;
  fs.appendFile(
    path.join(__dirname, "request_log.txt"),
    `${logMessage}\n`,
    (err) => {
      if (err) {
        console.error("Error logging request:", err);
      }
    }
  );
  next();
}

// Event-Driven Programming
// 5. File Watcher Create watchDirectory(dirPath, callback) that monitors a directory for file changes and executes a callback with change details.

function watchDirectory(dirPath, callback) {
  const watcher = fs.watch(dirPath, (eventType, filename) => {
    if (eventType === "rename") {
      callback({ type: eventType, filename });
    }
  });
}

// Buffer and Stream Operations
// 6. Chunk File Reader Implement readFileInChunks(filePath, chunkSize, callback) that reads a file in specified chunk sizes and processes each chunk.

const fs = require("fs");

function readFileInChunks(filePath, chunkSize, callback) {
  const stream = fs.createReadStream(filePath, { highWaterMark: chunkSize });
  let chunks = [];
  stream.on("data", (chunk) => {
    chunks.push(chunk);
    if (chunks.length === Math.ceil(chunkSize / 1024)) {
      const buffer = Buffer.concat(chunks);
      callback(buffer);
      chunks = [];
    }
  });
  stream.on("end", () => {
    if (chunks.length > 0) {
      const buffer = Buffer.concat(chunks);
      callback(buffer);
    }
  });
  stream.on("error", (err) => {
    console.error("Error reading file:", err);
  });
}

// Express.js Questions
// 7. Error Handling Middleware Write a global error handler that catches all errors, logs them, and returns appropriate JSON responses based on error type.

const express = require("express");
const app = express();
app.use(express.json());
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Mongoose Questions
// 8. User Model with Validation Create a User schema with email validation, password hashing pre-save hook, and a method to compare passwords.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,//it will validate the email format 
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hashPassword(this.password);
    }
    next();
});

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}





