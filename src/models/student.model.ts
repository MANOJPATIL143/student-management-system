import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface StudentInput {
  user: UserDocument["_id"];
  firstName?: string;
  lastName?: string;
  class?: string;
  admissionNo?: string;
  grade?: string;
  age?: number;
  guardianName?: string;
  guardianPhoneNumber?: string;
}

export interface StudentDocument extends StudentInput, mongoose.Document {}

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
      default: () => `student_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    class: { type: String, required: true },
    admissionNo: { type: String, required: true },
    grade: { type: String, required: true },
    age: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianPhoneNumber: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const StudentModel = mongoose.model<StudentDocument>("Student", studentSchema);

export default StudentModel;
