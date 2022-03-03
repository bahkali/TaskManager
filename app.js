const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./src/route/tasks");
const notFound = require("./src/middleware/not-found");
const connectDB = require("./src/db/connect");

require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/api/v1/tasks", routes);

//404 routes
app.use(notFound);

// set port and connect to db
const PORT = 3500 || process.env.PORT;
const dbUri = process.env.DB_URI;

const start = async () => {
  try {
    await connectDB(dbUri);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT} and database is connected`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
