var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var cors = require('cors');
var path = require("path");

let app = express();
dotenv.config();

app.use(express.json());
app.use( cors())

let dashboardroutes = require("./backend/Routes/dashboardroutes");
let loginroutes = require("./backend/Routes/loginroutes");

app.use("/api/squashapps", loginroutes);
app.use("/api/squashapps/dashboard", dashboardroutes);


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
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
}


const port = process.env.PORT || 8080;

app.listen(port, () => console.log("SERVER  S T A R T S"));
