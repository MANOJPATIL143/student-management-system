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
} from "../service/student.service";

export async function createStudentHandler(
  req: Request<{}, {}, CreateStudentInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const student = await createStudent({ ...body, user: userId });

  return res.send(student);
}

export async function updateProductHandler(
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
