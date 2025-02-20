const express = require("express");
const User = require("./models/user"); // Import User model
const router = express.Router();

// ✅ API Health Check
router.get("/", (req, res) => {
    res.send("API is working!");
});

// ✅ Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Create a new user (Signup)
router.post("/users", async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.json({ message: "User created successfully!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update a user
router.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Delete a user
router.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
