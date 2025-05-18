const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");
const {isLoggedIn}=require("../middleware");

router.get("/",isLoggedIn, (req, res) => {
  res.render("feedback");
});

router.post("/",isLoggedIn, async (req, res) => {
  try {
    const { name, email, rating, comments, improvement } = req.body;
    const feedback = new Feedback({ name, email, rating, comments, improvement });
    await feedback.save();
    req.flash("success","Thanks for Your valuable feedback");
    res.redirect("/Parijana");
  } catch (err) {
    res.status(500).send("Something went wrong while submitting feedback.");
  }
});

module.exports = router;
