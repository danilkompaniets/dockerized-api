import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, "Post must have a title"],
    },
    body: {
        type: String,
        require: [true, "Post must have a body"],
    },
});

const Post = mongoose.model("POST", postSchema);

export default Post;
