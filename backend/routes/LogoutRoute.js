const express = require("express");
const handleLogout = require("../controller/HandleLogout");

const LogoutRouter = express.Router();

LogoutRouter.get("/", handleLogout);
module.exports = LogoutRouter;
