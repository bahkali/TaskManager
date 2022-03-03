const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
// ROUTES
app.get("/", (req, res) => {
  res.send("Hello kaly");
});
const PORT = 3500 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
