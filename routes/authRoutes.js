const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ansluta till mongodb
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to database:", error);
});

// användare modell
const User = require("../models/User");

// Lägg till ny användare
router.post("/register", async (req, res) => {
    try {
        const {username, password} = req.body;


        // VALIDERA INPUT
        if (!username || !password) {
            return res.status(400).json({error: "Invalid input, send username and password"});
        }

        // Korrekt, spara användare
        const user = new User({username, password});
        await user.save();

        res.status(201).json({message: "User created"});
    } catch (error){
        res.status(500).json({error: "server error"});
    }
});

// Logga in användare
router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;


        // VALIDERA INPUT
        if (!username || !password) {
            return res.status(400).json({error: "Invalid input, send username and password"});
        }
        
        // kolla creadentials
        // finns användaren?
        const user = await User.findOne( {username });
        if(!user) {
            return res.status(401).json({ error: "Incorrect username/password"});
        }

        // kolla lösenordet
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) {
            return res.status(401).json({error: "Incorrect password/username"});
        } else {
            // create jwt
            const payload = {username: username};
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            const response = {
                message: "User logged in!",
                token: token
            }
            res.status(200).json({ response });
        }
    }
    catch (error) {
        res.status(500).json({error: "server error"});
    }
});

module.exports = router;