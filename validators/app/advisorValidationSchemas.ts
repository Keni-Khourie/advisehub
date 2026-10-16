import z from "zod"

export const createAdvisingNoteSchema = z.object({
    noteTitle:z.string().min(3, "Note title required"),
    noteContent:z.string().min(3, "Note content required"),
    nextSteps:z.array(z.string().min(1, "Empty values not allowed")).optional(),
    isPrivate:z.boolean().default(false)

})
export type CreateAdvisingNoteData =z.infer<typeof createAdvisingNoteSchema>

export const createAvailableTimeSchema =
z.object({
    availableTime:z.string()
})

export type CreateAvailableTimeData = z.infer<typeof createAvailableTimeSchema>