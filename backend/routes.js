const express = require("express");
const mongoose = require("mongoose"); // ✅ Import mongoose for ID validation
const router = express.Router();
const User = require("./models/User");

// ✅ Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Get a single user by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // 🔹 Validate MongoDB ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Create a user
router.post("/", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Update a user
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // 🔹 Validate MongoDB ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Delete a user
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // 🔹 Validate MongoDB ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
