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

    // ✅ show instantly
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
          setStatus("");
        }, 1000);
      }

      if (data.type === "online") setStatus("online");
      if (data.type === "offline") setStatus("offline");
    };
  }, [selectedUser]);

  return (
    <>
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
      />

      <button onClick={sendMsg}>Send</button>

      <MessageArea messages={messages} />
      <ProfileArea status={status} />
    </>
  );
}

export default TypeMessage;