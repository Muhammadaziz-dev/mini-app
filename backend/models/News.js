// models/News.js
import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // URL or path to an image
    author: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    slug: { type: String, required: true, unique: true },
});

export default mongoose.model("News", NewsSchema);
