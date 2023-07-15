import { Express, Request, Response } from "express";
import {
  createStudentHandler,
  getStudentHandler,
  updateStudentHandler,
  deleteStudentHandler,
} from "../controller/student.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "../controller/session.controller";
import { createUserHandler } from "../controller/user.controller";
import isAuthenticated from "../middleware/isAuthenticated";
import validateResource from "../middleware/validateResource";
import {
  createStudentSchema,
  deleteStudentSchema,
  getStudentSchema,
  updateStudentSchema,
} from "../schema/student.schema";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSchema } from "../schema/user.schema";

function routes(app: Express) {
  const baseUrl = "/api/v1";
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post(
    `${baseUrl}users`,
    validateResource(createUserSchema),
    createUserHandler
  );

  app.post(
    `${baseUrl}/sessions`,
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get(`${baseUrl}/sessions`, isAuthenticated, getUserSessionsHandler);

  app.delete(`${baseUrl}/sessions`, isAuthenticated, deleteSessionHandler);

  app.post(
    `${baseUrl}/students`,
    [isAuthenticated, validateResource(createStudentSchema)],
    createStudentHandler
  );

  app.put(
    `${baseUrl}/students/:studentId`,
    [isAuthenticated, validateResource(updateStudentSchema)],
    updateStudentHandler
  );

  app.get(
    `${baseUrl}/students/:studentId`,
    validateResource(getStudentSchema),
    getStudentHandler
  );

  app.delete(
    `${baseUrl}/students/:studentId`,
    [isAuthenticated, validateResource(deleteStudentSchema)],
    deleteStudentHandler
  );
}

export default routes;
