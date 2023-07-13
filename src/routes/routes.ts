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
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", isAuthenticated, getUserSessionsHandler);

  app.delete("/api/sessions", isAuthenticated, deleteSessionHandler);

  app.post(
    "/api/students",
    [isAuthenticated, validateResource(createStudentSchema)],
    createStudentHandler
  );

  app.put(
    "/api/students/:studentId",
    [isAuthenticated, validateResource(updateStudentSchema)],
    updateStudentHandler
  );

  app.get(
    "/api/students/:studentId",
    validateResource(getStudentSchema),
    getStudentHandler
  );

  app.delete(
    "/api/students/:studentId",
    [isAuthenticated, validateResource(deleteStudentSchema)],
    deleteStudentHandler
  );
}

export default routes;
