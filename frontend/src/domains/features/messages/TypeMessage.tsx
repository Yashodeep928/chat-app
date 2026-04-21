import { useState, useEffect } from "react";
import { socket, userId } from "../messages/api/websocket";
import MessageArea from "./MessageArea";
import ProfileArea from "./ProfileArea";

function TypeMessage({ selectedUser }: { selectedUser: string }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  const sendMsg = () => {
    if (!message.trim()) return;

    socket.send(JSON.stringify({
      type: "message",
      text: message,
      from: userId,
      to: selectedUser
    }));

    setMessages((prev) => [...prev, message]);
    setMessage("");
  };

  useEffect(() => {
    let typingTimeout: any;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (
        data.type === "message" &&
        (data.from === selectedUser || data.to === selectedUser)
      ) {
        setMessages((prev) => [...prev, data.text]);
      }

      if (data.type === "typing" && data.from === selectedUser) {
        setStatus("typing...");

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          setStatus("online");
        }, 1000);
      }

      if (data.type === "online") setStatus("online");
      if (data.type === "offline") setStatus("offline");
    };
  }, [selectedUser]);

  return (
    <div style={{
      width: "100%",
      maxWidth: "600px",
      background: "#fff",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
    }}>

      <ProfileArea status={status} />

      <MessageArea messages={messages} />

      <div style={{
        display: "flex",
        marginTop: "15px",
        gap: "10px"
      }}>
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);

            socket.send(JSON.stringify({
              type: "typing",
              from: userId,
              to: selectedUser
            }));
          }}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none"
          }}
        />

        <button
          onClick={sendMsg}
          style={{
            padding: "10px 15px",
            borderRadius: "8px",
            border: "none",
            background: "#4facfe",
            color: "#fff",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#00c6ff")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#4facfe")
          }
        >
          Send 🚀
        </button>
      </div>
    </div>
  );
}

export default TypeMessage;