const express = require("express");
const router = express.Router();
const multer = require("multer");
const Tesseract = require("tesseract.js");
const path = require("path");
const fs = require("fs");
const FormData = require("../models/formData.js");
const {isLoggedIn}=require("../middleware");

const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const upload = multer({ dest: uploadPath });

router.get("/",isLoggedIn,(req, res) => {
  res.render("formfilling.ejs", { data: null });
});

router.post("/upload",isLoggedIn,upload.single("doc"), async (req, res) => {
  if (!req.file) {
    return res.send("No file uploaded.");
  }
  const imagePath = req.file.path;
  try {
    const result = await Tesseract.recognize(imagePath, "eng");
    const extractedText = result.data.text;
    const nameMatch = extractedText.match(/Name[:\-]?\s*(.+)/i);
    const emailMatch = extractedText.match(/Email[:\-]?\s*(.+)/i);
    const phoneMatch = extractedText.match(/Phone[:\-]?\s*(.+)/i);
    const policyNumberMatch = extractedText.match(/Policy Number[:\-]?\s*(.+)/i);
    const claimTypeMatch = extractedText.match(/Claim Type[:\-]?\s*(.+)/i);
    const reasonMatch = extractedText.match(/Reason[:\-]?\s*(.+)/i);
    const addressMatch = extractedText.match(/Address[:\-]?\s*(.+)/i);
    const prefilledData = {
      name: nameMatch ? nameMatch[1].trim() : "",
      email: emailMatch ? emailMatch[1].trim() : "",
      phone: phoneMatch ? phoneMatch[1].trim() : "",
      policyNumber: policyNumberMatch ? policyNumberMatch[1].trim() : "",
      claimType: claimTypeMatch ? claimTypeMatch[1].trim() : "",
      reason: reasonMatch ? reasonMatch[1].trim() : "",
      address: addressMatch ? addressMatch[1].trim() : "",
      documentText: extractedText
    };
    fs.unlinkSync(imagePath);
    res.render("formfilling.ejs", { data: prefilledData });

  } catch (err) {
    console.error("OCR Error:", err);
    fs.unlinkSync(imagePath);
    res.send("OCR failed. Please upload a clearer image.");
  }
});

router.post("/submit",isLoggedIn,async (req, res) => {
  const { name, email, phone, policyNumber, claimType, address, documentText } = req.body;
  if (!name || !email || !phone || !policyNumber || !claimType || !address) {
    return res.send("Please fill in all required fields.");
  }
  const newForm = new FormData({
    name,
    email,
    phone,
    policyNumber,
    claimType,
    address,
    documentText
  });
  try {
    await newForm.save();
    res.redirect("/Parijana");
  } catch (err) {
    console.error("Error saving form:", err);
    res.send("An error occurred while saving your data. Please try again.");
  }
});

module.exports = router;
