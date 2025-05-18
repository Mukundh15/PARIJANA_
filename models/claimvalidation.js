const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  policyNumber: { type: String, required: true, unique: true },
  claimType: { type: String, required: true },
  address: { type: String, required: true },
  claimDetails: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Claimvalidation", claimSchema);
