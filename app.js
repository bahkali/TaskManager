const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./src/route/tasks");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

//Database connection
const dbUri = process.env.DB_URI;
mongoose.Promise = global.Promise;
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log());

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello kaly");
});

app.use("/api/v1/tasks", routes);

const PORT = 3500 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
