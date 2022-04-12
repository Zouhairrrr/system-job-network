const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        password: {
            type: String,
            required: true,
        },
        email: { type: String, required: true, unique: true, lowercase: true },
        role: {
            type: String,
            enum: ['client', 'admin', 'owner'],
            default: 'client',
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },

);

module.exports = mongoose.model("Users", UserSchema);