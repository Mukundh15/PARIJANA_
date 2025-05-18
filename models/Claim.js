// models/Claim.js
const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  claimId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  updatedAt: { type: Date, required: true },
});

const Claims = mongoose.model('Claims', claimSchema);

module.exports = Claims;
