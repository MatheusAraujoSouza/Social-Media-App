import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    schemaVersion: {
        type: Number,
        default: 1,
    },
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});


const postMessage = mongoose.model('postMessage',postSchema);

export default postMessage;