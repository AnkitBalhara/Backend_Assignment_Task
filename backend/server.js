const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    credentials: true, // Allow credentials if you need them in the future
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userModel = require("./models/userModel");
const connectDB = require("./db/userDB");
connectDB();

app.get("/", (req, res) => {
  res.send("Jai Shree Ram");
});

app.post("/registeruser", async (req, res) => {
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
});

app.post("/login/findUser", async (req, res) => {
  const { email, password } = req.body;
  const userDetails = await userModel.findOne({ email });
  if (!userDetails) {
    return res.status("400").json({ error: "No email exists.." });
  }

  bcrypt.compare(password, userDetails.password, (err, result) => {
    // console.log(result)
    if (!result) {
      return res.status("400").json({ error: "Password mismatch.." });
    }else{

      res.send("Jai Shree Ram");
    }
  });

  // const id = userDetails._id;
});

app.listen(3000, () => {
  console.log("Server Started");
});
