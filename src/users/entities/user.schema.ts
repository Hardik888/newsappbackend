import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        requrired: true,
        unique: true,
    },
    bio: {
        type: String,
        requrired: false,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    subscriptionType: {
        type: Boolean,


    },
});

