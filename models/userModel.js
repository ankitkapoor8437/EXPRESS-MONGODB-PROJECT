const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required:[true, "Username is required"]
        },
        firstname: {
            type: String,
            required:[true, "Firstname is required"]
        },
        lastname: {
            type: String,
            required:[true, "Lastname is required"]
        },
        email: {
            type: String,
            required:[true, "Email is required"],
            unique:[true, "Email address already exist"]
        },
        password: {
            type: String,
            required:[true, "Password is required"]
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);