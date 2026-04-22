import { useState } from "react";
import TypeMessage from "../messages/TypeMessage";
import { FaUserCircle } from "react-icons/fa";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  sidebar: {
    width: "240px",
    background: "#ffffff",
    padding: "20px",
    boxShadow: "2px 0 15px rgba(0,0,0,0.1)"
  },
  user: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "10px",
    marginBottom: "10px",
    transition: "all 0.3s ease"
  },
  chatArea: {
    flex: 1,
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

function ChatList() {
  const [selectedUser, setSelectedUser] = useState("");
  const users = ["user-1", "user-2"];

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={{ marginBottom: "20px", fontWeight: 600 }}>
          💬 Chats
        </h3>

        {users.map((u) => (
          <div
            key={u}
            onClick={() => setSelectedUser(u)}
            style={{
              ...styles.user,
              background:
                selectedUser === u ? "green" : "#f5f6fa",
              color: selectedUser === u ? "#fff" : "#333"
            }}
          >
            <FaUserCircle size={22} />
            <span>{u}</span>
          </div>
        ))}
      </div>

      <div style={styles.chatArea}>
        {selectedUser ? (
          <TypeMessage selectedUser={selectedUser} />
        ) : (
          <p style={{ color: "#fff", fontSize: "18px" }}>
            Select a chat to start 💬
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatList;