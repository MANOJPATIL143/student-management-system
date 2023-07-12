import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    class: { type: String },
    admissionNo: { type: String },
    grade: { type: String },
    age: { type: String },
    guardianName: { type: String },
    guardianPhoneNumber: { type: String },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const StudentModel = mongoose.model("Students", studentSchema);

module.exports = StudentModel;
