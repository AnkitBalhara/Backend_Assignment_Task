const express = require("express");

const LoginRouter = express.Router();

const handleLoginUser = require("../controller/HandleLoginUser");

LoginRouter.post("/", handleLoginUser);

module.exports = LoginRouter;
