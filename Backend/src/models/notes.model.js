const mongoose = require("mongoose");

const noteSchenma = new mongoose.Schema({
  title: String,
  description: String,
});

const noteModel = mongoose.model("notes", noteSchenma);

module.exports = noteModel;
