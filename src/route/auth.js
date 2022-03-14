const express = require("express");
const { signup, login, getAllUser } = require("../controllers/authController");
const router = express.Router();

router.get("/users", getAllUser);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
