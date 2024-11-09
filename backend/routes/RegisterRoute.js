const express = require("express");

const RegisterRouter = express.Router();
const  handleRegisterUser  = require("../controller/HandleRegisterUser");

RegisterRouter.post("/", handleRegisterUser);

module.exports = RegisterRouter;
