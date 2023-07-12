import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
userSchema.plugin(uniqueValidator, { message: "Email already in use." });

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
