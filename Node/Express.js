// ================= BACKEND (Node + Express + MongoDB) =================

// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");

const app = express();
app.use(cors());
app.use(express.json());
env.config();
const MongoURL = process.env.Atlas_URL;

//mongoose.connect("mongodb://localhost:27017/roommate_expense");
mongoose.connect(MongoURL);
// Models
const UserSchema = new mongoose.Schema({ name: String });
const User = mongoose.model("users", UserSchema);

const ExpenseSchema = new mongoose.Schema({
  date: Date,
  title: String,
  amount: Number,
  paidBy: String,
});
const Expense = mongoose.model("expenses", ExpenseSchema);

// Add User
app.post("/user", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Get Users
app.get("/user", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add Expense
app.post("/expense", async (req, res) => {
  const expense = await Expense.create(req.body);
  res.json(expense);
});

// Edit Expense
app.put("/edit/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const updated = await Expense.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          amount: req.body.amount,
          paidBy: req.body.paidBy,
          date: req.body.date,
        },
      },
    );
    res.json(updated);
  } catch (err) {
    res.json(err);
  }
});

app.delete("/clear", async (req, resp) => {
  try {
    const deleteExpe = await Expense.deleteMany();
  //  const deleteuser = await User.deleteMany();
    resp.json(deleteExpe);
  } catch (err) {
    resp.json(err);
  }
});

// Get Expenses
app.get("/expense", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Balance Calculation
app.get("/balance", async (req, res) => {
  const users = await User.find();
  const expenses = await Expense.find();

  let total = 0;
  let spendMap = {};

  users.forEach((u) => (spendMap[u.name] = 0));

  expenses.forEach((exp) => {
    total += exp.amount;
    spendMap[exp.paidBy] += exp.amount;
  });

  const share = total / users.length;

  let result = {};
  users.forEach((u) => {
    result[u.name] = spendMap[u.name] - share;
  });

  res.json({ total, share, result });
});

app.listen(5000, () => console.log("Server running on port 5000"));
