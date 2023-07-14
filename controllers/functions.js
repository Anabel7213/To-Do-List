function getDate() {
  let today = new Date();
  let options = { weekday: "short", month: "long", day: "numeric" };
  return today.toLocaleDateString("en-US", options);
}

const { Item, List } = require(__dirname + "/../models/schema.js");

let checkboxStates = [];

exports.renderAll = async (req, res) => {
  let day = getDate();
  try {
    const item = await Item.find({});
    res.render("list", {
      day: day,
      items: item,
      theme: req.cookies.theme,
      currentPage: "home",
      checkboxStates: checkboxStates,
    });
  } catch (err) {
    if (err) throw err;
  }
};

exports.createToDo = async (req, res) => {
  const itemName = req.body.input;
  try {
    await Item.create({
      name: itemName,
    });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.renderAbout = async (req, res) => {
  res.render("about", {
    theme: req.cookies.theme,
    currentPage: "about",
  });
};

exports.toggleTheme = (req, res) => {
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
};

exports.deleteToDo = async (req, res) => {
  try {
    await Item.deleteMany();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};