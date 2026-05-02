import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        width: "50%",
        padding: "50px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.05)",
        textAlign: "center"
      }}>
        <h1>ExpenseFlow</h1>
        <p>Track smart. Spend better.</p>

        <button
          onClick={() => navigate("/login")}
          style={{ padding: "15px 30px", marginTop: "20px" }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}