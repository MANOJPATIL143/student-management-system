/**
 * author: Elijah Ndung'u
 * dev.elijah.ndungu@gmail.com
 */

import { Request, Response } from "express";
import {
  CreateStudentInput,
  UpdateStudentInput,
} from "../schema/student.schema";
import {
  createStudent,
  deleteStudent,
  findAndUpdateStudent,
  findStudent,
  filterStudents,
} from "../service/student.service";
import { StudentInput } from "models/student.model";

export async function createStudentHandler(
  req: Request<{}, {}, CreateStudentInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const student = await createStudent({ ...body, user: userId });

  return res.send(student);
}

export async function updateStudentHandler(
  req: Request<UpdateStudentInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const studentId = req.params.studentId;
  const update = req.body;

  const student = await findStudent({ studentId });

  if (!student) {
    return res.sendStatus(404);
  }

  if (String(student.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedStudent = await findAndUpdateStudent({ studentId }, update, {
    new: true,
  });

  return res.send(updatedStudent);
}

export async function filterStudentsHandler(req: Request, res: Response) {
  const filters: StudentInput = {};

  if (req.query.grade) {
    filters.grade = req.query.grade as string;
  }

  if (req.query.class) {
    filters.class = req.query.class as string;
  }

  if (req.query.age) {
    filters.age = parseInt(req.query.age as string, 10);
  }

  if (req.query.admissionNo) {
    filters.admissionNo = req.query.admissionNo as string;
  }

  const students = await filterStudents(filters);

  return res.json(students);
}

export async function getStudentHandler(
  req: Request<UpdateStudentInput["params"]>,
  res: Response
) {
  const studentId = req.params.studentId;
  const student = await findStudent({ studentId });

  if (!student) {
    return res.sendStatus(404);
  }

  return res.send(student);
}

export async function deleteStudentHandler(
  req: Request<UpdateStudentInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const studentId = req.params.studentId;

  const student = await findStudent({ studentId });

  if (!student) {
    return res.sendStatus(404);
  }

  if (String(student.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteStudent({ studentId });

  return res.sendStatus(200);
}
