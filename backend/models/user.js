const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Username is required"], unique: true },
  origin: { type: String, required: [true, "Origin is required"] },
  meaning: { type: String, required: [true, "Meaning is required"] },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Self-reference for the creator
    default: null, // Initially, no creator (e.g., for initial admin users)
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;