const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./src/route/tasks");
require("dotenv").config();

const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello kaly");
});

// app.get('/api/v1/tasks') - get all the tasks
// app.post('/api/v1/tasks') - create a new tasks
// app.get('/api/v1/tasks/:id') - get single tasks
// app.patch('/api/v1/tasks/:id') - update tasks
// app.delete('/api/v1/tasks/:id') - delete tasks

app.use("/api/v1/tasks", routes);

const PORT = 3500 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
