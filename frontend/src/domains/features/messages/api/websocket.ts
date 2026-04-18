export const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("Connection Open");
  socket.send(JSON.stringify({
    type:"online",
    user:"user-1"
  }))
};


