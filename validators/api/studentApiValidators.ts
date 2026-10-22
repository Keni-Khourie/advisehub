import { z } from "zod";



export const createStudentSchema = z.object({
  studentId: z.string().regex(/^\d{8}$/, "Student ID must contain exactly 8 digits."),
  degreeId: z.number().int().positive("A valid degree ID is required."),
  enrollmentDate: z.string().refine(
    (value) => !Number.isNaN(Date.parse(value)),
    "A valid enrollment date is required.",
  ),
  expectedGraduationDate: z.string().refine(
    (value) => !Number.isNaN(Date.parse(value)),
    "A valid expected graduation date is required.",
  ),
  completedCredits: z.number().int().nonnegative(
    "Completed credits must be a non-negative integer.",
  ),
});

export type CreateStudentData = z.infer<typeof createStudentSchema>