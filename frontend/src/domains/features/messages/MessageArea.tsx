type MessageProps = {
  messages: string[];
};

function MessageArea({ messages }: MessageProps) {
  return (
    <>
      {messages.map((msg, index) => (
        <p key={index}>💬 {msg}</p>
      ))}
    </>
  );
}

export default MessageArea;