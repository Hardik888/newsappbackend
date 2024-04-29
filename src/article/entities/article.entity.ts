import { Document } from "mongoose";

export class Article extends Document {
    title: String
    description: String
    image: String
    provider: String
    horizontal: boolean
    hashtages: []
}