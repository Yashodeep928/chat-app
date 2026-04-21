function ProfileArea({ status }: { status: string }) {
  const getColor = () => {
    if (status === "online") return "green";
    if (status === "typing...") return "orange";
    return "red";
  };

  return (
    <div style={{
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}>
      <span
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: getColor()
        }}
      />
      <p style={{ margin: 0 }}>
        {status || "Offline"}
      </p>
    </div>
  );
}

export default ProfileArea;