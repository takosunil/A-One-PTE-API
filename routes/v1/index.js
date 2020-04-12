const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Api router working");
});

router.use("/questions", require("./questions"));

module.exports = router;
