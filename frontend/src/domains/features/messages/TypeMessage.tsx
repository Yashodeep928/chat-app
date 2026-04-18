import MessageArea from "./MessageArea";
import ProfileArea from "./ProfileArea";
import { socket } from "./api/websocket";
import { useState, useEffect } from "react";

type ChatListProps = {
  user:string,
  setSelectedUser:string;
}

function TypeMessage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  // ✅ Send message
  const sendMsg = () => {
    if (!message.trim()) return;

    socket.send(JSON.stringify({
      type: "message",
      text: message,
      user: "user-1"
    }));

    setMessage("");
  };

  // ✅ Receive messages
  useEffect(() => {
    let typingTimeout: any;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        setMessages((prev) => [...prev, data.text]);
      }

      if (data.type === "typing") {
        console.log(data.user + " is typing...");
        setStatus("typing...");

        // 🔥 Reset after 1 sec
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          setStatus("");
        }, 1000);
      }

      if (data.type === "online") {
        console.log(data.user + " is online");
      }

      if (data.type === "offline") {
        console.log(data.user + " is offline");
      }
    };
  }, []);

  return (
    <>
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);

          socket.send(JSON.stringify({
            type: "typing",
            user: "user-1"
          }));
        }}
      />

      <button onClick={sendMsg}>Send</button>

      <MessageArea messages={messages} />

      {/* ✅ Clean prop name */}
      <ProfileArea status={status} />
    </>
  );
}

export default TypeMessage;