var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var cors = require('cors');
var fs = require("fs");
var path = require("path");

let app = express();
// app.use(upload());
dotenv.config();

app.use(express.json());
app.use( cors())
//importing Routing

var adminRoute = require("./Routes/admin");

//introducing Middlewares

app.use("/api/squashapps", adminRoute);

//Connecting Database.
app.get("/", (req, res) => {
  res.send("Am in Home");
});

async function connection() {
  try {
    const response = await mongoose.connect(process.env.DB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log("db is not connected");
  }
}
connection();

console.log(path.join(__dirname + "/../frontend/build/index.html"))
console.log(express.static("/../frontend/build"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log("SERVER  S T A R T S"));
