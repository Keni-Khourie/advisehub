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