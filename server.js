const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// routes
app.use("/api", authRoutes);

// skyddad route
app.get("/api/admin", authenticateToken, (req, res) => {
    const username = req.username; // Användarnamn från JWT-token
    res.json({ message: `Välkommen ${username}!` });
});

// validera token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // token

    if (token == null) {
        return res.status(401).json({ message: "Not authorized for this route. Token is missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Not valid JWT" });
        }

        req.username = decoded.username;
        next();
    });
}

// Starta applikationen
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});