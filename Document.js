// server/models/Document.js

const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  data: { type: String, required: true },
});

module.exports = mongoose.model("Document", DocumentSchema);
