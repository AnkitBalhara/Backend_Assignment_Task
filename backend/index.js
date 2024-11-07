const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

app.use(
  cors({
    origin: "https://backend-assignment-task-36bc.vercel.app/",
    methods: "GET,POST",
    credentials: true, // This must be enabled to allow cookies to be sent and received
  })
);

// app.use(express.static("dist"))

app.use(cookieParser());
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
});

app.get("/profilepage", isSignedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send only the username and email in response
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Logout Route..
app.get("/logout", (req, res) => {
  console.log("Clearing cookie...");
  res.clearCookie("token", { httpOnly: true, sameSite: "lax", path: "/" });
  res.status(200).json({ message: "Logged out and token removed" });
});

app.get("/profilepage", isSignedIn, async (req, res) => {
  res.set("Cache-Control", "no-store");
  try {
    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ username: user.username, email: user.email });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Middleware:-
function isSignedIn(req, res, next) {
  if (req.cookies.token === "" || !req.cookies.token) {
    res.redirect("/login/findUser");
  } else {
    let data = jwt.verify(req.cookies.token, "secretkey");
    // console.log(data);
    req.user = data;
    next();
  }
}

app.listen(3000, () => {
  console.log("Server Started");
});
