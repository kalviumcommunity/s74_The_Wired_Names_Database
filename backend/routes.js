const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator"); // ✅ Express Validator
const router = express.Router();
const User = require("./models/user");

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

// ✅ Create a user (With Validation)
router.post("/", async (req, res) => {
    try {
        const { username, origin, meaning } = req.body;

        // ✅ Validate required fields
        if (!username || !origin || !meaning) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newUser = new User({ username, origin, meaning });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// ✅ Update a user (With Validation)
router.put(
    "/:id",
    [
        body("username").optional().isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
        body("origin").optional().isLength({ min: 2 }).withMessage("Origin must be at least 2 characters long"),
        body("meaning").optional().isLength({ min: 5 }).withMessage("Meaning must be at least 5 characters long"),
    ],
    async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation errors", errors: errors.array() });
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
);

// ✅ Delete a user
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

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
