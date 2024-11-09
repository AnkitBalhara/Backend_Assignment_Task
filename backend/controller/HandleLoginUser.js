const isSignedIn = require("../middleware/IsSignedIn");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  const userDetails = await userModel.findOne({ email });
  if (!userDetails) {
    return res.status(400).json({ error: "No email exists.." });
  }

  bcrypt.compare(password, userDetails.password, (err, result) => {
    if (!result) {
      return res.status(400).json({ error: "Password mismatch.." });
    } else {
      let token = jwt.sign(
        { email: email, userId: userDetails._id },
        "secretkey"
      );
      // Set the token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });
      res.status(200).json({ message: "Login successful" });
    }
  });
};

module.exports = handleLoginUser;
