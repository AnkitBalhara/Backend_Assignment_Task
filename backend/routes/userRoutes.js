const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Jai Shree Ram");
});

module.exports = router;