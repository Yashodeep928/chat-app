import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });

const users = new Map();

wss.on("connection", (ws) => {
  console.log("🟢 Connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());

    if (data.type === "init") {
      ws.userId = data.user;
      users.set(data.user, ws);
      return;
    }

    const target = users.get(data.to);

    if (target && target.readyState === WebSocket.OPEN) {
      target.send(JSON.stringify(data));
    }
  });

  ws.on("close", () => {
    if (ws.userId) {
      users.delete(ws.userId);
      console.log(ws.userId, "disconnected");
    }
  });
});