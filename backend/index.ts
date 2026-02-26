/**
 * 🦫 OuiChat Backend
 * Real-time messaging for Quebec
 */

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";

config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

// In-memory storage (replace with Supabase later)
const users = new Map();
const messages = new Map();
const conversations = new Map();

// TI-GUY bot responses
const TI_GUY_RESPONSES = [
  "Salut mon chum! 🦫",
  "Osti que c'est beau ça!",
  "Tabarnouche, raconte-moi plus!",
  "C'est la vie au Québec! ⚜️",
  "T'as tu essayé la poutine hier? 🍟",
  "Go Habs Go! 🏒",
  "Ben coudonc, c'est fou ça!",
  "Parle-moi de ton projet!",
];

io.on("connection", (socket) => {
  console.log("👋 New connection:", socket.id);

  // User joins
  socket.on("user:join", (userData) => {
    const user = {
      id: socket.id,
      username: userData.username || `User_${socket.id.slice(0, 5)}`,
      avatar: userData.avatar || "🦫",
      status: "online",
    };
    users.set(socket.id, user);
    socket.broadcast.emit("user:joined", user);
    console.log(`✅ ${user.username} joined`);
  });

  // Send message
  socket.on("message:send", (data) => {
    const message = {
      id: uuidv4(),
      content: data.content,
      senderId: socket.id,
      sender: users.get(socket.id),
      timestamp: new Date(),
      type: data.type || "text",
      conversationId: data.conversationId,
    };

    // Save message
    messages.set(message.id, message);

    // Broadcast to conversation
    io.to(data.conversationId).emit("message:received", message);

    // TI-GUY bot response (random chance)
    if (Math.random() < 0.1 && !data.content.includes("/nobot")) {
      setTimeout(() => {
        const botMessage = {
          id: uuidv4(),
          content: TI_GUY_RESPONSES[Math.floor(Math.random() * TI_GUY_RESPONSES.length)],
          senderId: "ti-guy",
          sender: { id: "ti-guy", username: "TI-GUY", avatar: "🦫", status: "online" },
          timestamp: new Date(),
          type: "text",
          conversationId: data.conversationId,
          isBot: true,
        };
        io.to(data.conversationId).emit("message:received", botMessage);
      }, 2000);
    }
  });

  // Join conversation
  socket.on("conversation:join", (conversationId) => {
    socket.join(conversationId);
    console.log(`${socket.id} joined conversation: ${conversationId}`);
  });

  // Voice message
  socket.on("message:voice", (data) => {
    const message = {
      id: uuidv4(),
      content: "🎙️ Message vocal",
      audioUrl: data.audioUrl,
      senderId: socket.id,
      sender: users.get(socket.id),
      timestamp: new Date(),
      type: "voice",
      duration: data.duration,
      conversationId: data.conversationId,
    };
    io.to(data.conversationId).emit("message:received", message);
  });

  // Typing indicator
  socket.on("typing:start", (conversationId) => {
    socket.to(conversationId).emit("typing:start", {
      userId: socket.id,
      username: users.get(socket.id)?.username,
    });
  });

  socket.on("typing:stop", (conversationId) => {
    socket.to(conversationId).emit("typing:stop", { userId: socket.id });
  });

  // Disconnect
  socket.on("disconnect", () => {
    const user = users.get(socket.id);
    if (user) {
      user.status = "offline";
      socket.broadcast.emit("user:left", user);
      console.log(`👋 ${user.username} left`);
    }
  });
});

// REST API endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", users: users.size, messages: messages.size });
});

app.get("/api/users", (req, res) => {
  res.json(Array.from(users.values()));
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🦫 OuiChat server running on port ${PORT}`);
});
