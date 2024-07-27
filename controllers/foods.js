// controllers/foods.js

const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const { route } = require("./auth.js");
const { render } = require("ejs");

// router logic will go here - will be built later on in the lab
router.get("/", async (req, res) => {
  try {
    const currentuser = await User.findById(req.session.user._id);

    res.render("foods/index.ejs", { foods: currentuser.foods });
  } catch (err) {
    console.log(error);
    res.redirect("/");
  }
});
router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});
router.post("/", async (req, res) => {
  try {
    const currentuser = await User.findById(req.session.user._id);
    currentuser.foods.push(req.body);
    await currentuser.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
router.get("/:foodid", async (req, res) => {
  const currentuser = await User.findById(req.session.user._id);
  const food = currentuser.foods.id(req.params.foodid);

  res.render("foods/show.ejs", { food: food });
});
router.delete("/:foodid", async (req, res) => {
  try {
    const currentuser = await User.findById(req.session.user._id);
    currentuser.foods.id(req.params.foodid).deleteOne();
    await currentuser.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
router.get("/:foodid/edit", async (req, res) => {
  try {
    const currentuser = await User.findById(req.session.user._id);
    const food = currentuser.foods.id(req.params.foodid);

    res.render("foods/edit.ejs", { food });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

router.put("/:foodId", async (req, res) => {
  try {
    const currentuser = await User.findById(req.session.user._id);
    const food = currentuser.foods.id(req.params.foodId);

    food.set(req.body);
    await currentuser.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
module.exports = router;
