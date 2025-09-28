// DOM Elements
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const chatMessages = document.getElementById("chat-messages");
const usersList = document.getElementById("users");
const typingIndicator = document.getElementById("typing-indicator");
const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");

// User data
const currentUser = { name: "You", avatar: "Y" };
const onlineUsers = [
  { name: "Sohail", avatar: "A", status: "online" },
  { name: "Samir", avatar: "B", status: "online" },
  { name: "Charlie", avatar: "C", status: "online" },
];

// Load messages from localStorage
let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

// Functions
function displayMessage(message, isSent = false, index) {
  const messageElement = document.createElement("div");
  messageElement.className = `message ${isSent ? "sent" : ""}`;
  messageElement.setAttribute("data-index", index);

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = isSent ? currentUser.avatar : message.avatar;

  const messageContent = document.createElement("div");
  messageContent.className = "message-content";

  const messageText = document.createElement("div");
  messageText.className = "message-text";
  messageText.textContent = message.text;

  const messageTime = document.createElement("div");
  messageTime.className = "message-time";
  messageTime.textContent = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isSent) {
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener("click", () => deleteMessage(index));
    messageContent.appendChild(deleteBtn);
  }

  messageContent.appendChild(messageText);
  messageContent.appendChild(messageTime);

  messageElement.appendChild(avatar);
  messageElement.appendChild(messageContent);

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "") return;

  const message = {
    text,
    avatar: currentUser.avatar,
    timestamp: Date.now(),
  };

  messages.push(message);
  localStorage.setItem("chatMessages", JSON.stringify(messages));

  displayMessage(message, true, messages.length - 1);
  messageInput.value = "";

  // Simulate typing indicator for incoming message
  setTimeout(() => {
    typingIndicator.textContent = "Alice is typing...";
    typingIndicator.style.opacity = "1";
  }, 500);

  // Simulate incoming message after a delay
  setTimeout(() => {
    typingIndicator.style.opacity = "0";
    const incomingMessage = {
      text: "Thanks for your message!",
      avatar: "A",
      timestamp: Date.now(),
    };
    messages.push(incomingMessage);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    displayMessage(incomingMessage, false, messages.length - 1);
  }, 2000);
}

function deleteMessage(index) {
  messages.splice(index, 1);
  localStorage.setItem("chatMessages", JSON.stringify(messages));
  const messageElement = document.querySelector(`[data-index="${index}"]`);
  if (messageElement) {
    messageElement.remove();
  }
}

function displayUsers() {
  usersList.innerHTML = "";
  onlineUsers.forEach((user) => {
    const li = document.createElement("li");
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = user.avatar;

    const name = document.createElement("span");
    name.textContent = user.name;

    const status = document.createElement("div");
    status.className = "status";

    li.appendChild(avatar);
    li.appendChild(name);
    li.appendChild(status);
    usersList.appendChild(li);
  });
}

function loadMessages() {
  messages.forEach((message, index) => {
    const isSent = message.avatar === currentUser.avatar;
    displayMessage(message, isSent, index);
  });
}

// Event Listeners
sendBtn.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

const sidebarClose = document.getElementById("sidebar-close");
sidebarClose.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

// Initialize
displayUsers();
loadMessages();
