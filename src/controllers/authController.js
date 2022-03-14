const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  // Check if User exist
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(500).json({ error: "User already exist." });
  }

  // Encrypt password with bcrypt
  const hashPassword = await bcrypt.hashSync(password, 12);
  await User.create({
    name: name,
    email: email,
    password: hashPassword,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err);
    });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if user exist and get his info
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      res.status(500).json({ error: "User does not exist." });
    }

    // check password if correct
    const checkpwd = await bcrypt.compareSync(password, existingUser.password);
    if (!checkpwd) {
      res.status(500).json({ error: "Password incorrect" });
    }

    // generate a token to send to user
    const token = jwt.sign(
      { email: email, userId: existingUser._id.toString() },
      "supersecret"
    );

    res.status(200).json({
      jwtToken: token,
      email: email,
      msg: "Access granted",
    });
  } catch (err) {
    next(err);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  getAllUser,
};
