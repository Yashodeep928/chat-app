import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

const clients = new Set();

wss.on("connection", (ws) => {
  console.log("🟢 Connected to the server");

  clients.add(ws);

  // ✅ Message event (correct place)
  ws.on("message", (message) => {
    console.log("📩 Message Received:", message.toString());

    // Broadcast
    clients.forEach((client) => {
      client.send(message.toString());
    });
  });

  // ✅ Close event (correct usage)
  ws.on("close", () => {
    console.log("🔴 Client disconnected");
    clients.delete(ws);
  });
});