import { Document } from "mongoose";

export class Article extends Document {
    title: string
    description: string
    image: string
    provider: String
    horizontal: boolean
    hashtags: []
}