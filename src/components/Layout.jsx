import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "200px", padding: "20px" }}>
        <h2>ExpenseFlow</h2>
       <p style={{ fontSize: "20px", margin: "15px 0" }}>
  <Link to="/dashboard">Dashboard</Link>
</p>

<p style={{ fontSize: "20px", margin: "15px 0" }}>
  <Link to="/history">History</Link>
</p>
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}