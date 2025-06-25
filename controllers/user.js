const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const handleCreateNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const createdUser = await User.create({ name, email, password });
    res.status(201).json({
      status: "success",
      data: {
        user: createdUser,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: "error",
      message: "Server Error",
      error: err.message,
    });
  }
};

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Email or Password",
    });
  }
  const token = setUser(user);
  res.cookie("token", token);
  res.redirect("/");
};

module.exports = {
  handleCreateNewUser,
  handleLoginUser,
};
