// ================= FRONTEND (React) =================

// App.js (Using FETCH instead of Axios)
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  //  const month = new Date().getMonth();
  const AllClearPas = import.meta.env.VITE_Allclear_Pass;
  const Backend_URL = import.meta.env.VITE_Backend_URL;
  console.log("Pass -> ", AllClearPas);
  const mongoAtlas =
    "mongodb+srv://palrajan196_db_user:e45d1vl2k4Ai1MMh@expense-cluster.hx0vuld.mongodb.net/";
  const d = new Date();
  const month = d.toLocaleString("default", { month: "long" });
  console.log(month);
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState({});

  const [name, setName] = useState("");
  const [date, setDate] = useState("2026-03-31");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [addExpensebutton, setAddExpensebutton] = useState(Boolean);
  const [addEditButton, setAddEditButton] = useState(Boolean);
  const [editId, setEditId] = useState("");

  const fetchData = async () => {
    const u = await fetch(`${Backend_URL}/user`);
    const uData = await u.json();

    const e = await fetch(`${Backend_URL}/expense`);
    const eData = await e.json();

    const b = await fetch(`${Backend_URL}/balance`);
    const bData = await b.json();

    setUsers(uData);
    setExpenses(eData);
    setBalance(bData);
    setAddEditButton(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addUser = async () => {
    try{
    await fetch(`${Backend_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    alert("User is added sucessfully");
  }
  catch(err){
    alert("User is not added some error");
  }

    setName("");
    fetchData();
  };

  const addExpense = async () => {
    try{
       setAddExpensebutton(true);
  const addExpen = await fetch(`${Backend_URL}/expense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        title,
        amount: Number(amount),
        paidBy,
      }),
    });
    alert("Expense is added sucessful");
    }
      catch(err){
        alert("Some Error Please Try Again");
      }

    setTitle("");
    setAmount("");
    fetchData();
     setAddExpensebutton(false);
  };

  const edit = async (data) => {
    setEditId(data);
    setAddEditButton(false);
    setAddExpensebutton(true);
    setTitle(data.title);
    setAmount(data.amount);
    setPaidBy(data.paidBy);
    //       setDate(data.date);
  };

  const editExpense = async (id) => {
    try{
    const userId = id._id;
    const edit = await fetch(`${Backend_URL}/edit/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        title,
        amount: Number(amount),
        paidBy,
      }),
    });
    const result = await edit.json();
    //console.log(result);
    alert("Expense is edited sucessfully");
  }
  catch(err){
      console.log(err);
      alert("Expense is not edited try again");
  }
    setAddExpensebutton(false);
    setTitle("");
    setAmount("");
    setPaidBy("");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const clearAll = async () => {
    const code = prompt("Enter Code :");
    if (code == AllClearPas) {
      alert("Deletion is successful");

      const clear = await fetch(`${Backend_URL}/clear`, {
        method: "DELETE",
      });

      const result = await clear.json();
    } else {
      alert("Your Code is wrong try again");
    }
    console.log(code, AllClearPas);
  };

  return (
    <div>
      <h1 id="Heading">Hi Garmi</h1>
      <div id="addUserSection">
        <h3>Add User</h3>
        <div id="addUserSectionInput">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name ...."
          />
          <button onClick={addUser}>Add</button>
        </div>
      </div>

      <div id="inputField">
        <h3>Add Expense</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addExpense();
          }}
        >
          <div id="formSection">
            <input
              type="date"
              value={date}
              placeholder="set Date"
              onChange={(e) => {
                setDate(e.target.value);
                required;
              }}
            />
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select id="selectInput"
              required
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
            >
              <option value="" disabled>
                Select User
              </option>

              {users.map((u) => (
                <option key={u._id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={addExpensebutton}>
            Add Expense
          </button>
          <button
            type="button"
            id="editButton"
            onClick={() => editExpense(editId)}
            disabled={addEditButton}
          >
            Edit
          </button>
        </form>
      </div>

      <div id="Table">
        <h3>Expenses of {month}</h3>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Paid By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e._id}>
                <td>{formatDate(e.date)}</td>
                <td>{e.title}</td>
                <td>₹{e.amount}</td>
                <td>{e.paidBy}</td>
                <td>
                  <button id="editButton" onClick={() => edit(e)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="clearAll">
        <button onClick={clearAll}>Clear All</button>
      </div>
      <div id="calculation">
        <h3>Balance</h3>
        <div id="result">
          {balance.result &&
            Object.keys(balance.result).map((user) => (
              <p key={user}>
                <span id="userName">{user}</span>:{" "}
                {balance.result[user] > 0 ? "+" : ""}
                {balance.result[user] > 0 ? (
                  <span id="userPositive">
                    {balance.result[user].toFixed(2)}
                  </span>
                ) : (
                  <span id="userNegative">
                    {balance.result[user].toFixed(2)}
                  </span>
                )}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
