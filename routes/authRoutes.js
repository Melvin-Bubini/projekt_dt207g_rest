const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// användare modell
const User = require("../models/User");

// Hårdkodat användarnamn och lösenord
const hardcodedUsername = "Admin"; 
const hardcodedPassword = "password"; 

// Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // VALIDERA INPUT
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        // Kolla hårdkodat användarnamn och lösenord
        if (username !== hardcodedUsername || password !== hardcodedPassword) {
            return res.status(401).json({ error: "Incorrect username/password" });
        }

        // Skapa JWT
        const payload = { username: username };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        const response = {
            message: "User logged in!",
            token: token
        };
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
});

// Lägg till ny användare
// router.post("/register", async (req, res) => {
//     try {
//         const {username, password} = req.body;


//         // VALIDERA INPUT
//         if (!username || !password) {
//             return res.status(400).json({error: "Invalid input, send username and password"});
//         }

//         // Korrekt, spara användare
//         const user = new User({username, password});
//         await user.save();

//         res.status(201).json({message: "User created"});
//     } catch (error){
//         res.status(500).json({error: "server error"});
//     }
// });



module.exports = router;