const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");

// Middleware..
const isSignedIn = require("./middleware/IsSignedIn");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    credentials: true, // This must be enabled to allow cookies to be sent and received
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = require("./db/userDB");
connectDB();

const router = require("./routes/userRoutes");
const RegisterRouter = require("./routes/RegisterRoute");
const LoginRouter = require("./routes/LoginRouter");
const ProfileRouter = require("./routes/ProfileRoute");
const LogoutRouter = require("./routes/LogoutRoute");

// User Route..
app.use("/", router);
// RegisterUser Route..
app.use("/registeruser", RegisterRouter);
// Login User Route..
app.use("/login/findUser", LoginRouter);
// Profile View Route..
app.use("/profilepage", ProfileRouter);
// Logout Route..
app.use("/logout", LogoutRouter);

// app.get("/profilepage", isSignedIn, async (req, res) => {
//   res.set("Cache-Control", "no-store");
//   try {
//     const user = await userModel.findById(req.user.userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json({ username: user.username, email: user.email });
//   } catch (error) {
//     console.error("Error fetching profile data:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

app.listen(3000, () => {
  console.log("Server Started");
});
