import { z } from "zod";
export const assignUserRoleSchema = z.object({
  role: z.enum(["STUDENT", "ADVISOR", "ADMIN"]),
});

export type AssignUserRoleData = z.infer<typeof assignUserRoleSchema>
