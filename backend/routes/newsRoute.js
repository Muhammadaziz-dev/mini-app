// routes/newsRoute.js
import express from "express";
import News from "../models/News.js"; // Ensure your News model is in ESM format
import multer from "multer";

const router = express.Router();

// Configure multer for file uploadss
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploadss/"); // Ensure this folder exists in your project root
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// Create a news post with optional image upload
router.post("/", upload.single("imageFile"), async (req, res) => {
    try {
        const { title, content, author, slug } = req.body;
        // Use uploaded file if available; fallback to req.body.image if provided
        const image = req.file ? `/images/${req.file.filename}` : req.body.image || "";
        const newsItem = new News({ title, content, image, author, slug });
        await newsItem.save();
        res.status(201).json(newsItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve all news posts (most recent first)
router.get("/", async (req, res) => {
    try {
        const news = await News.find().sort({ publishedDate: -1 });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve a single news post by slug
router.get("/:slug", async (req, res) => {
    try {
        const newsItem = await News.findOne({ slug: req.params.slug });
        if (!newsItem) {
            return res.status(404).json({ message: "News item not found" });
        }
        res.json(newsItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a news post by ID
router.put("/:id", async (req, res) => {
    try {
        const { title, content, image, author, slug } = req.body;
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            { title, content, image, author, slug },
            { new: true, runValidators: true }
        );
        if (!updatedNews) {
            return res.status(404).json({ message: "News item not found" });
        }
        res.json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a news post by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedNews = await News.findByIdAndDelete(req.params.id);
        if (!deletedNews) {
            return res.status(404).json({ message: "News item not found" });
        }
        res.json({ message: "News item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
