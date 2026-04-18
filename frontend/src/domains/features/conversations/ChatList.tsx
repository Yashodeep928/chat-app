import { useState } from "react"
import TypeMessage from "../messages/TypeMessage"
function ChatList() {
  const [user, setSelectedUser] = useState("")
  const users =  ["user-1","user-2"] 
  return (
    <>
    {users.map((user) => (
  <button key={user} onClick={() => setSelectedUser(user)}>
    {user}
  </button>
))}

       <TypeMessage 
       setSelectedUser = {setSelectedUser}
       user={user} />

    
    </>
  )
}

export default ChatList