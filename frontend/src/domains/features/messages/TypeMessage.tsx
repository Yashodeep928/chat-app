import MessageArea from "./MessageArea"
import { webSocket } from "./api/websocket"

function TypeMessage() {
    const sendMsg = () =>{

    }
  return (
    <>
    
    <input type="text"  />

    <button onClick={sendMsg}>Send</button>


    <MessageArea
      messages={messages}
    />
    
    </>
  )
}

export default TypeMessage