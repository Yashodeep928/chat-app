
type MessageProps = {
  Message : String;
}

function MessageArea({Message}:MessageProps  ) {
  return (
    <>
    
    <p> Your recieved {Message}</p>
    
    </>
  )
}

export default MessageArea