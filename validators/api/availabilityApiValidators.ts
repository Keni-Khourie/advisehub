import { z } from "zod";
export const createAdvisorAvailabilitySchemaPrevious = z.object({
  dateTime: z.iso.datetime({
    offset:true
  })
});

export const createAdvisorAvailabilitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  timeZone: z.string().min(1),
});
export type CreateAdvisorAvailabilityData = z.infer<typeof createAdvisorAvailabilitySchema>

export const availabilityDateFilterSchema = z.iso.datetime({
  offset: true,
});