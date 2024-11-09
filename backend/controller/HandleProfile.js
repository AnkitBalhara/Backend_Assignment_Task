const userModel = require("../models/userModel");



const handleUserProfile = async (req, res) => {
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
};

module.exports = handleUserProfile;
