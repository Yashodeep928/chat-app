import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });

// userId → websocket
const users = new Map();

wss.on("connection", (ws) => {
  console.log("New connection");

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());

    // =========================
    // INIT (USER CONNECTS)
    // =========================
    if (data.type === "init") {
      ws.userId = data.user;
      users.set(data.user, ws);

      console.log(data.user, "registered");

      // notify others
      users.forEach((client) => {
        client.send(JSON.stringify({
          type: "online",
          user: data.user
        }));
      });

      return;
    }

    // =========================
    // ⌨️ TYPING (FORWARD ONLY)
    // =========================
    if (data.type === "typing") {
      const target = users.get(data.to);

      if (target && target.readyState === WebSocket.OPEN) {
        target.send(JSON.stringify({
          type: "typing",
          from: data.from
        }));
      }

      return;
    }

    // =========================
    // 💬 MESSAGE (FORWARD ONLY)
    // =========================
    if (data.type === "message") {
      const target = users.get(data.to);

      if (target && target.readyState === WebSocket.OPEN) {
        target.send(JSON.stringify(data));
      }

      return;
    }
  });

  // =========================
  // DISCONNECT
  // =========================
  ws.on("close", () => {
    if (ws.userId) {
      console.log(ws.userId, "disconnected");

      users.delete(ws.userId);

      // notify others
      users.forEach((client) => {
        client.send(JSON.stringify({
          type: "offline",
          user: ws.userId
        }));
      });
    }
  });
});