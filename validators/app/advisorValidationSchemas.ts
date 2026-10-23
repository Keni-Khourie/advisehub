import z from "zod"

export const createAdvisingNoteSchema1 = z.object({
    title:z.string().min(3, "Note title required"),
    content:z.string().min(3, "Note content required"),
    nextSteps:z.array(z.string().min(1, "Empty values not allowed")).optional(),
    isPrivate:z.boolean(),
    studentId:z.string(),

})
export const createAdvisingNoteSchema=z.object({
  title: z.string().trim().min(1, "Title is required."),
  content: z.string().trim().min(1, "Content is required."),
  nextSteps: z.array(z.string().trim().min(1)).optional(),
  isPrivate: z.boolean(),
  studentId: z.string().regex(
    /^\d{8}$/,
    "Student ID must contain exactly 8 digits.",
  ),
});
export type CreateAdvisingNoteData =z.infer<typeof createAdvisingNoteSchema>

export const createAvailableTimeSchema =
z.object({
    availableTime:z.string()
})

export type CreateAvailableTimeData = z.infer<typeof createAvailableTimeSchema>