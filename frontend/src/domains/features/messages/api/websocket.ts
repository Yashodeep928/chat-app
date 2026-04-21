const params = new URLSearchParams(window.location.search);
export const userId = params.get("user") || "user-1";

export const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("🟢 Connected as", userId);

  socket.send(JSON.stringify({
    type: "init",
    user: userId
    // presence:"online"
  }));
};