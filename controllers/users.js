const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({});

    res.render("users/index.ejs", { users });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.get("/:username", async (req, res) => {
  try {
    const existinguser = await User.findOne({
      username: req.params.username,
    });

    const foods = existinguser;
    res.render("users/show.ejs", { foods });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
module.exports = router;
