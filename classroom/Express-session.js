const express = require("express");
const app = express();
const port = 3000;
const expressSession = require("express-session");
const flash = require("connect-flash");
const path = require("path");
//const connect = require("./connect");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
};
app.use(flash());
app.use(expressSession(sessionOptions));
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.failMsg = req.flash("fail");
  next();
});

app.get("/register", (req, res) => {
  let { name = "anynomous" } = req.query;
  req.session.name = name;
  if (name === "anynomous") {
    req.flash("fail", "user not registered");
  } else {
    req.flash("success", "register successfully");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("hello.ejs", { name: req.session.name });
});

// app.get("/name", (req, res) => {
//   let { name = "anynonymous" } = req.query;
//   req.session.name = name;
//   res.send(name);
// });

// app.get("/set" , (req,res) => {
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`send a req ${req.session.count} times`);
// })

// app.get("/", (req, res) => {
//   res.send("Get route");
// });

app.listen(port, () => {
  console.log("working express session");
});
