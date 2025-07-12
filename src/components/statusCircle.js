export default function StatusCircle({ status }) {

  return (
    <div
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: status == "online" ? "#50db7f" : "#3498db",
        boxShadow: "0 0px 15px rgba(0, 0, 0, 0.4)"
      }}
    ></div>
  );
}
