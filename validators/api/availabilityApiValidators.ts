import { z } from "zod";
export const createAdvisorAvailabilitySchema = z.object({
  dateTime: z.iso.datetime({
    offset:true
  })
});

export type CreateAdvisorAvailabilityData = z.infer<typeof createAdvisorAvailabilitySchema>

export const availabilityDateFilterSchema = z.iso.datetime({
  offset: true,
});