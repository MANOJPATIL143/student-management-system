import { Express, Request, Response } from "express";
import {
  createStudentHandler,
  getStudentHandler,
  updateStudentHandler,
  deleteStudentHandler,
  filterStudentsHandler,
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
  listStudentSchema,
} from "../schema/student.schema";
import { createSessionSchema } from "../schema/session.schema";
import { createUserSchema } from "../schema/user.schema";

function routes(app: Express) {
  const baseUrl = "/api";

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/auth/register':
   *  post:
   *     tags:
   *     - Users
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post(
    `${baseUrl}/auth/register`,
    validateResource(createUserSchema),
    createUserHandler
  );

  /**
   * @openapi
   * /api/auth/login:
   *  post:
   *     tags:
   *     - Users
   *     summary: Login with email and password to obtain JWT token
   *     responses:
   *       200:
   *
   */
  app.post(
    `${baseUrl}/auth/login`,
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  /**
   * @openapi
   * /api/auth/sessions:
   *  get:
   *     tags:
   *     - Users
   *     summary: Get logged in user details
   *     responses:
   *       200:
   *
   */

  app.get(`${baseUrl}/auth/sessions`, isAuthenticated, getUserSessionsHandler);

  /**
   * @openapi
   * /api/auth/sessions:
   *  delete:
   *     tags:
   *     - Users
   *     summary: terminate and destroy user sessions
   *     responses:
   *       200:
   *
   */
  app.delete(`${baseUrl}/auth/sessions`, isAuthenticated, deleteSessionHandler);

  //Students APIS

  /**
   * @openapi
   * tags:
   *   name: Students
   *   description: The students managing API
   * /api/students:
   *   get:
   *     summary: Lists all the students
   *     tags: [Students]
   *     responses:
   *       200:
   *         description: The list of the students
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/CreateStudentInput'
   *   post:
   *     summary: Create a new student
   *     tags: [Students]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateStudentInput'
   *     responses:
   *       200:
   *         description: The student was created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateStudentInput'
   *       500:
   *         description: Some server error
   * /api/students/{studentId}:
   *   get:
   *     summary: Get the student by studentId
   *     tags: [Students]
   *     parameters:
   *       - in: path
   *         name: studentId
   *         schema:
   *           type: string
   *         required: true
   *         description: The studentId
   *     responses:
   *       200:
   *         description: The student response by studentId
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateStudentInput'
   *       404:
   *         description: The student was not found
   *   put:
   *    summary: Update the student by the studentId
   *    tags: [Students]
   *    parameters:
   *      - in: path
   *        name: studentId
   *        schema:
   *          type: integer
   *        required: true
   *        description: The student id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateStudentInput'
   *    responses:
   *      200:
   *        description: The book was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateStudentInput'
   *      404:
   *        description: The student was not found
   *      500:
   *        description: Some error happened
   *   delete:
   *     summary: Remove the student by studentId
   *     tags: [Students]
   *     parameters:
   *       - in: path
   *         name: studentId
   *         schema:
   *           type: integer
   *         required: true
   *         description: The student id
   *
   *     responses:
   *       200:
   *         description: The student was deleted
   *       404:
   *         description: The student was not found
   */

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

  app.get(
    `${baseUrl}/students`,
    validateResource(listStudentSchema),
    filterStudentsHandler
  );

  app.delete(
    `${baseUrl}/students/:studentId`,
    [isAuthenticated, validateResource(deleteStudentSchema)],
    deleteStudentHandler
  );
}

export default routes;
