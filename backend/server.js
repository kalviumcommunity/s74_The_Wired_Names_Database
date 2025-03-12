require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes"); // Import routes.js

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("✅ Database Connected Successfully!");
}).catch((error) => {
    console.error("❌ Database Connection Failed:", error);
});

app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Middleware to parse JSON

// ✅ Use routes.js for all API endpoints
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
