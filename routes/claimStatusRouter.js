const express = require('express');
const router = express.Router();
const Claims = require('../models/Claim');
const {isLoggedIn}=require("../middleware");


router.get('/',isLoggedIn, (req, res) => {
  res.render('claimStatus');
});

router.post('/',isLoggedIn, async (req, res) => {
  const {claimId}=req.body;
  if (!claimId) {
    return res.status(400).json({ error: "Claim ID is required." });
  }
  try {
    const id=claimId.toUpperCase();
    const claim=await Claims.findOne({ claimId: id });
    if (claim) {
      res.json({
        status: claim.status,
        updatedAt: claim.updatedAt ? claim.updatedAt.toDateString() : "Unknown"
      });
    } else {
      res.json({ error: "Claim not found. Please check your Claim ID." });
    }
  } catch (error) {
    console.error('Error fetching claim:', error.stack);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
