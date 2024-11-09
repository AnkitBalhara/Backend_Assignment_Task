const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");


const handleRegisterUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userCheck = await userModel.findOne({ email });
  if (userCheck)
    return res
      .status(400)
      .json({ error: "User Already Exist with this email!!!" });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      try {
        if (!username || !email || !password) {
          return res.status(400).json({ error: "All fields are required" });
        }

        const userData = await userModel.create({
          username,
          email,
          password: hash,
        });

        res
          .status(201)
          .json({ message: "User registered successfully", userData });
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ error: error.message });
      }
    });
  });
};

module.exports = handleRegisterUser;