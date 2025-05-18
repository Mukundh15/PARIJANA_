const express = require("express");
const router = express.Router();
const {isLoggedIn}=require("../middleware");

router.get("/validate",isLoggedIn, (req, res) => {
  res.render("claimvalidation.ejs", { message: null });
});

router.post("/validate",isLoggedIn, (req, res) => {
  const { policyNumber, claimType, address, claimDetails } = req.body;
  if (!policyNumber || policyNumber.length !== 10 || !/^[a-zA-Z0-9]+$/.test(policyNumber)) {
    return res.render("claimvalidation.ejs", { message: "Invalid Policy Number. Must be 10 alphanumeric characters." });
  }
  const validClaimTypes = ["Health", "Property", "Life"];
  if (!claimType || !validClaimTypes.includes(claimType)) {
    return res.render("claimvalidation.ejs", { message: "Invalid Claim Type. Choose Health, Property, or Life." });
  }

  if (!address || address.trim() === "") {
    return res.render("claimvalidation.ejs", { message: "Address cannot be empty." });
  }

  let statusMessage = "Claim is Valid";
  if (!claimDetails || claimDetails.length < 10) {
    statusMessage = "Claim is Invalid. Please provide more details in the claim description.";
  }
  res.render("claimvalidation.ejs", { message: statusMessage });
});

module.exports = router;
