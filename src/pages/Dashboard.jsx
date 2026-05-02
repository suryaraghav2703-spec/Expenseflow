import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Chart from "../components/Chart";

export default function Dashboard() {

  // Stores all expenses
  const [expenses, setExpenses] = useState([]);

  // Used to track which expense is being edited
  const [editingId, setEditingId] = useState(null);

  //  Budget localstorage mai store hoga
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) || 0
  );

  // Form ka data for inputs
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: ""
  });

  // jab components screen par pehli baar load honge tab local storage se past data idhar set hoga
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(data);
  }, []);

  // Add or update an expense
  const addExpense = (e) => {
    e.preventDefault();

    // Prevent empty input
    if (!formData.title || !formData.amount) return;

    const exp = {
      id: editingId || Date.now(),
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category || "Other"
    };

    let updated;

    // If editing  replace existing item
    if (editingId) {
      updated = expenses.map((item) =>
        item.id === editingId ? exp : item
      );
      setEditingId(null);
    } else {
      // Otherwise add new expense
      updated = [...expenses, exp];
    }

    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));

    // Clear form after submit
    setFormData({ title: "", amount: "", category: "" });
  };

  // Delete expense
  const deleteExpense = (id) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  // fill form for editing
  const editExpense = (exp) => {
    setFormData({
      title: exp.title,
      amount: exp.amount,
      category: exp.category
    });

    setEditingId(exp.id);
  };

  // Calculate total expense
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  // find highest expense
  const highest =
    expenses.length > 0
      ? expenses.reduce((max, e) =>
          e.amount > max.amount ? e : max
        )
      : null;

  // Prepare data for charts (based on title)
  const chartData = Object.values(
    expenses.reduce((acc, curr) => {
      if (!acc[curr.title]) {
        acc[curr.title] = {
          name: curr.title,
          value: 0
        };
      }
      acc[curr.title].value += curr.amount;
      return acc;
    }, {})
  );

  // Save current dashboard data to history
  const saveToHistory = () => {
    const history = JSON.parse(localStorage.getItem("history")) || [];

    const snapshot = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      expenses,
      budget
    };

    localStorage.setItem("history", JSON.stringify([...history, snapshot]));

    // Clear dashboard after saving
    setExpenses([]);
    localStorage.setItem("expenses", JSON.stringify([]));
  };

  return (
    <Layout>
      <div className="container">

        {/* Total and highest expense */}
        <div className="card">
          <h2>Total: ₹{total}</h2>

          {highest && (
            <h3>
              Highest: {highest.title} (₹{highest.amount})
            </h3>
          )}
        </div>

        {/* Budget section */}
        <div className="card">
          <h2>Monthly Budget</h2>

          <input
            placeholder="Set Budget ₹"
            onChange={(e) => {
              const val = Number(e.target.value);
              setBudget(val);
              localStorage.setItem("budget", val);
            }}
          />

          <p>Budget: ₹{budget}</p>
          <p>Spent: ₹{total}</p>
          <p>Remaining: ₹{budget - total}</p>

          {total > budget && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              Budget Exceeded
            </p>
          )}
        </div>

        {/* Expense form */}
        <div className="card">
          <h2>{editingId ? "Edit Expense" : "Add Expense"}</h2>

          <form onSubmit={addExpense}>

            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <input
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option>Bills</option>
              <option>Shopping</option>
              <option>Travel</option>
              <option>Food</option>
            </select>

            <button>
              {editingId ? "Update" : "Add"}
            </button>
          </form>
        </div>

        {/* Charts */}
        <Chart data={chartData} />

        {/* Expense list */}
        <div className="card">
          <h2>Expenses</h2>

          {expenses.map((e) => (
            <div key={e.id} style={{ marginBottom: "15px" }}>
              <p>
                {e.title} ₹{e.amount} ({e.category})
              </p>

              <button onClick={() => editExpense(e)}>Edit</button>
              <button onClick={() => deleteExpense(e.id)}>Delete</button>
            </div>
          ))}
        </div>

        {/* Save snapshot */}
        <button onClick={saveToHistory}>
          Save to History
        </button>

      </div>
    </Layout>
  );
}