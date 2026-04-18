type StatusProps = {
  status: string;
};

function ProfileArea({ status }: StatusProps) {
  return (
    <>
      <p>Typing status is {status}</p>
    </>
  );
}

export default ProfileArea;