const express = require("express");
const ProfileRouter = express.Router();

const isSignedIn = require("../middleware/IsSignedIn");
const handleUserProfile = require("../controller/HandleProfile")

ProfileRouter.get("/", isSignedIn, handleUserProfile);

module.exports = ProfileRouter;
