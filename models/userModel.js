import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        minLength: 1,
        maxLength: 50,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
});

const User = mongoose.model("USER", userSchema);

export default User;
