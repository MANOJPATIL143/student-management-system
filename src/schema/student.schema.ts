import { object, number, string, TypeOf } from "zod";

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
