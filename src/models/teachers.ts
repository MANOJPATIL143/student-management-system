import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");

const teacherSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "TEACHER", enum: ["TEACHER", "ADMIN"] },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
teacherSchema.plugin(uniqueValidator, { message: "Email already in use." });

const TeacherModel = mongoose.model("Teachers", teacherSchema);

module.exports = TeacherModel;
