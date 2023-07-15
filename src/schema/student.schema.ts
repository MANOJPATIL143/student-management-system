import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateStudentInput:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - admissionNo
 *        - grade
 *        - class
 *        - age
 *        - guardianName
 *        - guardianPhoneNumber
 *      properties:
 *        firstName:
 *          type: string
 *          default: Gerald
 *        lastName:
 *          type: string
 *          default: Lumumba
 *        admissionNo:
 *          type: string
 *          default: ADM-5536
 *        grade:
 *          type: string
 *          default: B+
 *        age:
 *          type: number
 *          default: 13
 *        class:
 *          type: string
 *          default: 7B
 *        guardianName:
 *          type: string
 *          default: Mary Lumumba
 *        guardianPhoneNumber:
 *          type: string
 *          default: 0712345678
 *    CreateStudentResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        admissionNo:
 *          type: string
 *        grade:
 *          type: string
 *        age:
 *          type: number
 *        class:
 *          type: string
 *        guardianName:
 *          type: string
 *        guardianPhoneNumber:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

const payload = {
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    admissionNo: string({
      required_error: "Admission Number is required",
    }),
    grade: string({
      required_error: "Grade is required",
    }),
    class: string({
      required_error: "Class is required",
    }),
    age: number({
      required_error: "Age is required",
    }),
    guardianName: string({
      required_error: "Guardian name is required",
    }),
    guardianPhoneNumber: string({
      required_error: "Guardian phone number is required",
    }),
  }),
};

const params = {
  params: object({
    studentId: string({
      required_error: "studentId is required",
    }),
  }),
};

export const createStudentSchema = object({
  ...payload,
});

export const updateStudentSchema = object({
  ...payload,
  ...params,
});

export const deleteStudentSchema = object({
  ...params,
});

export const getStudentSchema = object({
  ...params,
});

export type CreateStudentInput = TypeOf<typeof createStudentSchema>;
export type UpdateStudentInput = TypeOf<typeof updateStudentSchema>;
export type ReadStudentInput = TypeOf<typeof getStudentSchema>;
export type DeleteStudentInput = TypeOf<typeof deleteStudentSchema>;
