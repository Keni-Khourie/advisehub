import { z } from "zod";

export const createAppointmentSchema = z.object({
  advisorId: z.string().regex(/^\d{8}$/, "Advisor ID must be 8 digits."),
  availabilityId: z.number().int().positive(),
  note: z.string().optional(),
});

export type CreateAppointmentData = z.infer<typeof createAppointmentSchema>