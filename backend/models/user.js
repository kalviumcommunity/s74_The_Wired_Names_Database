const mongoose = require("mongoose");

const NameSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Consider changing to "name"
    origin: { type: String, required: true },
    meaning: { type: String, required: true }
});

const Name = mongoose.model("Name", NameSchema);
module.exports = Name;
