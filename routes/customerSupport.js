const express = require("express");
const router = express.Router();


router.get("/customerSupport", (req, res) => {
  res.render("customerSupport.ejs", { message: null }); 
});

router.post("/customerSupport", (req, res) => {
  const { policyNumber, claimType, address, claimDetails } = req.body;
  let message = "";
  let messageType = "alert-danger";

  if (!policyNumber || policyNumber.length !== 10 || !/^[a-zA-Z0-9]+$/.test(policyNumber)) {
    message = "Invalid Policy Number. It must be 10 alphanumeric characters.";
  }
  else if (!claimType || !["Health", "Property", "Life"].includes(claimType)) {
    message = "Invalid Claim Type. Choose Health, Property, or Life.";
  }
  else if (!address || address.trim() === "") {
    message = "Address cannot be empty.";
  }
  else if (!claimDetails || claimDetails.length < 10) {
    message = "Claim Details are too short. Please provide more information.";
  }
  else {
    message = "Your claim has been successfully validated.";
    messageType = "alert-success"; 
  }

  res.render("customerSupport.ejs", { message: message, messageType: messageType });
});

module.exports = router;
