import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import StudentModel, {
  StudentDocument,
  StudentInput,
} from "../models/student.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createStudent(input: StudentInput) {
  const metricsLabels = {
    operation: "createStudent",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await StudentModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findStudent(
  query: FilterQuery<StudentDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findStudent",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await StudentModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

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

export async function deleteProduct(query: FilterQuery<StudentDocument>) {
  return StudentModel.deleteOne(query);
}
