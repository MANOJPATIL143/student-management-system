import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import StudentModel, {
  StudentDocument,
  StudentInput,
} from "../models/student.model";

export async function createStudent(input: StudentInput) {
  try {
    const result = await StudentModel.create(input);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function findStudents({}, query: FilterQuery<StudentDocument>) {
  return StudentModel.find(query).lean();
}

export async function findStudent(
  query: FilterQuery<StudentDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const result = await StudentModel.findOne(query, {}, options);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function findAndUpdateStudent(
  query: FilterQuery<StudentDocument>,
  update: UpdateQuery<StudentDocument>,
  options: QueryOptions
) {
  return StudentModel.findOneAndUpdate(query, update, options);
}

export async function deleteStudent(query: FilterQuery<StudentDocument>) {
  return StudentModel.deleteOne(query);
}
