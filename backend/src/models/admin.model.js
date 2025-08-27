import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const adminSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
    },

    Refreshtoken: {
        type: String,
    },

})

// ❌ Remove pre("save") middleware that was hashing password

// 🔹 Compare plain text password directly
adminSchema.methods.isPasswordCorrect = async function (password) {
    return password === this.password;
}

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            Email: this.Email, // ⚠️ Email is not in schema, might always be undefined
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

adminSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            Email: this.Email, // ⚠️ Same issue here
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}

const admin = mongoose.model("admin", adminSchema);

export { admin }
