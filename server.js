const express = require('express');
const dotenv = require('dotenv'); 
dotenv.config();

const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");

const Monster = require('./models/monsters.js');


const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.set("view engine", "ejs");

/* ---------- ROUTES ---------- */

// GET /
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// GET /monsters/new
app.get("/monsters/new", (req, res) => {
  res.render("monsters/new.ejs");
});

// GET /monsters/:monsterId (SHOW)
app.get("/monsters/:monsterId", async (req, res) => {
  const foundMonster = await Monster.findById(req.params.monsterId);
  res.render("monsters/show.ejs", { monster: foundMonster });
});

// POST /monsters (CREATE)
app.post("/monsters", async (req, res) => {
  await Monster.create(req.body);
  res.redirect("/monsters");
});

// DELETE /monsters/:monsterId
app.delete("/monsters/:monsterId", async (req, res) => {
  await Monster.findByIdAndDelete(req.params.monsterId);
  res.redirect("/monsters");
});

// GET /monsters/:monsterId/edit (EDIT)
app.get("/monsters/:monsterId/edit", async (req, res) => {
  const foundMonster = await Monster.findById(req.params.monsterId);
  res.render("monsters/edit.ejs", { monster: foundMonster });
});

// GET /monsters (INDEX)
app.get("/monsters", async (req, res) => {
  const allMonsters = await Monster.find();
  res.render("monsters/index.ejs", { monsters: allMonsters });
});


// PUT /monsters/:monsterId (UPDATE)
app.put("/monsters/:monsterId", async (req, res) => {
  await Monster.findByIdAndUpdate(req.params.monsterId, req.body);
  res.redirect(`/monsters/${req.params.monsterId}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});