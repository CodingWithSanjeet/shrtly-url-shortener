const express = require("express");
const userRouter = express.Router();
const { handleCreateNewUser, handleLoginUser } = require("../controllers/user");

userRouter.post("/", handleCreateNewUser);
userRouter.post("/login", handleLoginUser)

module.exports = userRouter;
