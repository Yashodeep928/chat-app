import { useState } from "react";
import TypeMessage from "../messages/TypeMessage";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial"
  },
  sidebar: {
    width: "200px",
    borderRight: "1px solid #ccc",
    padding: "10px"
  },
  user: {
    padding: "8px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "5px"
  },
  chatArea: {
    flex: 1,
    padding: "20px"
  }
};

function ChatList() {
  const [selectedUser, setSelectedUser] = useState("");

  const users = ["user-1", "user-2"];

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3>Users</h3>

        {users.map((u) => (
          <div
            key={u}
            onClick={() => setSelectedUser(u)}
            style={{
              ...styles.user,
              backgroundColor: selectedUser === u ? "#e0f2ff" : "white"
            }}
          >
            {u}
          </div>
        ))}
      </div>

      <div style={styles.chatArea}>
        {selectedUser ? (
          <TypeMessage selectedUser={selectedUser} />
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
}

export default ChatList;