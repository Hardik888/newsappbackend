import mongoose from "mongoose";
import { Article } from "./article.entity";

export const articleSchema = new mongoose.Schema<Article>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    hashtages: {
        type: [{ String }]
    },

}, { timestamps: true })