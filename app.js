const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Item = require("./models/items");

const app = express();

// DB Config
const db = require("./config/keys").database;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
app.use(methodOverride("_method"));

// EJS
// app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require("./routes/index"));
app.use("/items", require("./routes/items"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Inventory Tracker Server Started at port ${PORT}`)
);
