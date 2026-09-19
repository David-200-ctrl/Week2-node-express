const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// JSON parsing
app.use(express.json());

// Custom middleware - logs requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static HTML
app.use(express.static(path.join(__dirname, "public")));

// POST /user
app.post("/user", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    res.send(`Hello, ${name}!`);
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
    res.send(`User ${req.params.id} profile`);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: "Something went wrong"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});