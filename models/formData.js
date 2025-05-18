const mongoose = require('mongoose');

// Define the schema for form data
const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  policyNumber: { type: String, required: true },
  claimType: { type: String, required: true },
  reason: { type: String },             // New field for reason
  address: { type: String, required: true },
  documentText: { type: String },       // Text extracted from the document (OCR)
  createdAt: {
    type: Date,
    default: Date.now                    // Automatically sets the creation date
  }
});

// Create the model for the FormData schema
module.exports = mongoose.model('FormData', formDataSchema);
