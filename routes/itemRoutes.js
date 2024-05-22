const express = require("express");
const router = express.Router();
const Item  = require("../models/Item");

// Skapa ett nytt objekt till menyn
router.post("/items", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Läs in alla objekt
router.get("/items", async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Läs in ett objekt med ID
router.get("/items/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Item not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Uppdatera ett objekt
router.put("/items/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedItem) return res.status(404).json({ error: "Item not found" });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Ta bort ett objekt
router.delete("/items/:id", async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: "Item not found" });
        res.status(200).json({ message: "Item deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;