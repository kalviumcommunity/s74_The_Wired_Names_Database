require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Home route with DB connection status
app.get('/', (req, res) => {
    const status = mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
    res.json({ message: "Welcome to the ASAP Project", database_status: status });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
