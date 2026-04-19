type Props = {
  messages: string[];
};

function MessageArea({ messages }: Props) {
  return (
    <>
      {messages.map((msg, i) => (
        <p key={i}>💬 {msg}</p>
      ))}
    </>
  );
}

export default MessageArea;