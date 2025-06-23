// Collaborative Editor without using class

let socket = null;
let editor = null;
let currentRoom = null;
let currentUser = null;
let remoteCursors = new Map();
let ignoreNextChange = false;

function initializeEventListeners() {
  // Room joining
  document.getElementById("join-form").addEventListener("submit", (e) => {
    e.preventDefault();
    joinRoom();
  });

  document.getElementById("create-room-btn").addEventListener("click", () => {
    createRandomRoom();
  });

  // Room leaving
  document.getElementById("leave-room-btn").addEventListener("click", () => {
    leaveRoom();
  });

  // Copy room ID
  document.getElementById("copy-room-btn").addEventListener("click", () => {
    copyRoomId();
  });

  // Run code functionality
  const runBtn = document.getElementById("run-code-btn");
  if (runBtn) {
    runBtn.addEventListener("click", async () => {
      const outputArea = document.getElementById("output-area");
      outputArea.textContent = "Running...";
      let code = "";
      if (editor && typeof editor.getValue === "function") {
        code = editor.getValue();
      } else {
        code = document.getElementById("code-editor").value;
      }
      try {
        const res = await fetch("/api/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data = await res.json();
        // console.log("Run result:", data);
        let result = "";
        if (data.output) result += data.output;
        if (data.error) result += (result ? "\n" : "") + data.error;
        outputArea.textContent = result || "No output";
      } catch (err) {
        outputArea.textContent = "Error running code.";
      }
    });
  }
}

function createRandomRoom() {
  const roomId = generateRoomId();
  document.getElementById("room-id").value = roomId;
  showToast("Random room ID generated!", "success");
}

function generateRoomId() {
  const adjectives = [
    "swift",
    "bright",
    "cosmic",
    "stellar",
    "quantum",
    "digital",
    "cyber",
    "neon",
  ];
  const nouns = [
    "code",
    "lab",
    "space",
    "hub",
    "zone",
    "room",
    "studio",
    "forge",
  ];
  const randomNum = Math.floor(Math.random() * 1000);

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective}-${noun}-${randomNum}`;
}

function joinRoom() {
  const username = document.getElementById("username").value.trim();
  const roomId =
    document.getElementById("room-id").value.trim() || generateRoomId();

  if (!username) {
    showToast("Please enter your name", "error");
    return;
  }

  currentUser = username;
  currentRoom = roomId;

  initializeSocket();
  socket.emit("join-room", { roomId, username });
}

function initializeSocket() {
  socket = io();

  socket.on("connect", () => {
    updateConnectionStatus(true);
  });

  socket.on("disconnect", () => {
    updateConnectionStatus(false);
  });

  socket.on("code-sync", (data) => {
    showEditor();
    initializeCodeEditor(data.code);
    updateUsersList(data.users);
    showToast(`Joined room: ${currentRoom}`, "success");
  });

  socket.on("user-joined", (data) => {
    updateUsersList(data.users);
    showToast(`${data.user.username} joined the room`, "success");
  });

  socket.on("user-left", (data) => {
    updateUsersList(data.users);
    removeCursor(data.userId);
  });

  socket.on("code-change", (data) => {
    handleRemoteCodeChange(data);
  });

  socket.on("cursor-update", (data) => {
    updateRemoteCursor(data);
  });
}

function initializeCodeEditor(initialCode) {
  const textarea = document.getElementById("code-editor");

  editor = CodeMirror.fromTextArea(textarea, {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    lineWrapping: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
    },
  });

  editor.setValue(initialCode);

  // Handle code changes
  editor.on("change", (instance, changeObj) => {
    if (ignoreNextChange) {
      ignoreNextChange = false;
      return;
    }

    const content = instance.getValue();
    socket.emit("code-change", {
      operation: changeObj,
      content: content,
    });
  });

  // Handle cursor position changes
  editor.on("cursorActivity", (instance) => {
    const cursor = instance.getCursor();
    const selection = instance.getSelection();

    socket.emit("cursor-position", {
      position: cursor,
      selection: selection,
    });
  });
}

function handleRemoteCodeChange(data) {
  if (editor) {
    ignoreNextChange = true;
    editor.setValue(data.content);
  }
}

function updateRemoteCursor(data) {
  // Simple cursor display - in a production app, you'd want more sophisticated operational transform
  remoteCursors.set(data.userId, data);
  renderCursors();
}

function renderCursors() {
  const overlay = document.getElementById("cursors-overlay");
  overlay.innerHTML = "";

  remoteCursors.forEach((cursorData, userId) => {
    if (editor) {
      const pos = editor.charCoords(cursorData.position, "local");
      const cursor = document.createElement("div");
      cursor.className = "remote-cursor";
      cursor.style.backgroundColor = cursorData.color;
      cursor.style.left = pos.left + "px";
      cursor.style.top = pos.top + "px";

      const label = document.createElement("div");
      label.className = "cursor-label";
      label.textContent = cursorData.username;
      label.style.backgroundColor = cursorData.color;
      cursor.appendChild(label);

      overlay.appendChild(cursor);
    }
  });
}

function removeCursor(userId) {
  remoteCursors.delete(userId);
  renderCursors();
}

function updateUsersList(users) {
  const usersList = document.getElementById("users-list");
  usersList.innerHTML = "";

  users.forEach((user) => {
    const avatar = document.createElement("div");
    avatar.className = "user-avatar";
    avatar.style.backgroundColor = user.color;
    avatar.textContent = user.username.charAt(0).toUpperCase();
    avatar.dataset.username = user.username;

    usersList.appendChild(avatar);
  });
}

function showEditor() {
  document.getElementById("room-selection").classList.add("hidden");
  document.getElementById("editor-screen").classList.remove("hidden");
  document.getElementById("current-room-id").textContent = currentRoom;
}

function leaveRoom() {
  if (socket) {
    socket.disconnect();
  }

  document.getElementById("editor-screen").classList.add("hidden");
  document.getElementById("room-selection").classList.remove("hidden");

  // Reset form
  document.getElementById("username").value = "";
  document.getElementById("room-id").value = "";

  currentRoom = null;
  currentUser = null;
  editor = null;
  remoteCursors.clear();
}

function copyRoomId() {
  navigator.clipboard
    .writeText(currentRoom)
    .then(() => {
      showToast("Room ID copied to clipboard!", "success");
    })
    .catch(() => {
      showToast("Failed to copy room ID", "error");
    });
}

function updateConnectionStatus(connected) {
  const indicator = document.getElementById("connection-indicator");
  const text = document.getElementById("connection-text");

  if (connected) {
    indicator.classList.add("connected");
    indicator.classList.remove("disconnected");
    text.textContent = "Connected";
  } else {
    indicator.classList.add("disconnected");
    indicator.classList.remove("connected");
    text.textContent = "Disconnected";
  }
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeEventListeners();
});
