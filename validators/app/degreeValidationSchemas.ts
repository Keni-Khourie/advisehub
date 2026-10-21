import z from "zod"

export const createDegreeValidationSchema = z.object({
    degreeName : z.string()
})