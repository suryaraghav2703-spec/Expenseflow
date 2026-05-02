import Layout from "../components/Layout";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data);
  }, []);

  const deleteHistory = (id) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  return (
    <Layout>
      <div className="container">
        <h2>History</h2>

        {history.map((h) => (
          <div className="card" key={h.id}>
            <h3>{h.date}</h3>
            <p><b>Budget:</b> ₹{h.budget}</p>

            {h.expenses.map((e) => (
              <p key={e.id}>
                {e.title} - ₹{e.amount} ({e.category})
              </p>
            ))}

            <button onClick={() => deleteHistory(h.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}