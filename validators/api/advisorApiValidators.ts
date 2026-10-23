import { z } from "zod";
 export const createAdvisorSpecializationSchema = z.object({
  name: z.enum([
    "Academic Planning",
    "Course Registration",
    "Degree Requirements",
    "Transfer Credits",
    "General Advising",
  ]),
});
export type CreateAdvisorSpecializationData = z.infer<typeof createAdvisorSpecializationSchema>



export const createAdvisorSchema = z.object({
  advisorId: z.string().regex(
    /^\d{8}$/,
    "Advisor ID must contain exactly 8 digits.",
  ),
  title: z.string().trim().max(50).optional().nullable(),
  office: z.string().trim().min(1, "Office is required."),
  yearsOfExperience: z.number().int().nonnegative(
    "Years of experience must be a non-negative integer.",
  ),
  specialization: z.enum([
    "Academic Planning",
    "Course Registration",
    "Degree Requirements",
    "Transfer Credits",
    "General Advising",
  ]),
});
export type CreateAdvisorData = z.infer<typeof createAdvisorSchema>