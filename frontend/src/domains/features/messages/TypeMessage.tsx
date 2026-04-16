import MessageArea from "./MessageArea"
import { socket } from "./api/websocket"

import { useState } from "react"



function TypeMessage() {
    const [message,setMessage] = useState("")

    const sendMsg =  () =>{
         
        socket.send(message)
        setMessage("")

    }
  return (
    <>
    
    <input value={message} onChange={(e)=> setMessage(e.target.value)}  type="text"/>

    <button onClick={sendMsg}>Send</button>


    <MessageArea Message={message}/>
    
    </>
  )
}

export default TypeMessage