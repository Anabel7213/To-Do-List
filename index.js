const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const date = require(__dirname + "/date.js");

let items = [];
let workItems = [];
let checkboxStates = [];

app.use(express.static("stylesheets"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", {
    day: day,
    items: items,
    theme: req.cookies.theme,
    currentPage: "home",
    checkboxStates: checkboxStates,
  });
});

app.post("/", function (req, res) {
  let userInput = req.body.input;

  if (req.body.list === "Work List") {
    workItems.push(userInput);
    res.redirect("/work");
  } else {
    items.push(userInput);
    res.redirect("/");
  }

  checkboxStates = new Array(items.length).fill('');
});

app.get("/work", function (req, res) {
  res.render("list", {
    day: "Work List",
    items: workItems,
    theme: req.cookies.theme,
    currentPage: "home",
    checkboxStates: checkboxStates,
  });
});

app.post("/work", function (req, res) {
  let item = req.body.input;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about", {
    theme: req.cookies.theme,
    currentPage: "about",
  });
});

app.get("/theme", function (req, res) {
  const themes = [
    { name: "default-theme", darker: "#945219", lighter: "#F7C396" },
    { name: "violet-theme", darker: "#3C2B84", lighter: "#C1C8FB" },
    { name: "peachy-theme", darker: "#7C1D19", lighter: "#F18C84" },
    { name: "rosy-theme", darker: "#6C1A45", lighter: "#EE9BB1" },
    { name: "lettuce-theme", darker: "#465B43", lighter: "#D6F5D1" },
  ];

  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  res.cookie("theme", randomTheme.name);
  res.redirect("/");
});

app.get("/clear-all", function (req, res) {
  items = items.filter((item) => item.checked === false);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000);