require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const functions = require(__dirname + "/controllers/functions.js");
app.use(express.static("stylesheets"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const DB = process.env.DB.replace("<password>", process.env.DB_PASS);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    if (err) throw err;
  });

app.get("/", (req, res) => {
  functions.renderAll(req, res);
});

app.post("/", (req, res) => {
  functions.createToDo(req, res);
});

app.get("/about", (req, res) => {
  functions.renderAbout(req, res);
});

app.get("/theme", (req, res) => {
  functions.toggleTheme(req, res);
});

app.get("/clear", async (req, res) => {
  functions.deleteToDo(req, res);
});

app.listen(process.env.PORT || 3000);