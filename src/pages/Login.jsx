import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        width: "50%",
        minWidth: "400px",
        padding: "50px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)"
      }}>

        <h2 style={{ fontSize: "32px" }}>Login</h2>

        <input
          type="email"
          placeholder="Enter your email"
          style={{ width: "100%", padding: "15px", marginTop: "15px", fontSize: "16px" }}
        />

        <input
          type="password"
          placeholder="Enter password"
          style={{ width: "100%", padding: "15px", marginTop: "10px", fontSize: "16px" }}
        />

        <button
          style={{ marginTop: "20px", width: "100%", fontSize: "18px" }}
          onClick={() => nav("/dashboard")}
        >
          Login
        </button>

      </div>
    </div>
  );
}