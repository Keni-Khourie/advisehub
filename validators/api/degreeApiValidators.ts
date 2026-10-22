import { z } from "zod";
import {validDegreeClassifications} from "@/constants"

export const createDegreeClassificationSchema = z
  .object({
    name: z.string().trim().min(1),
    abbreviation: z.string().trim().min(1),
  })
  .superRefine((data, ctx) => {
    const match = validDegreeClassifications.find(
      (item) =>
        item.name === data.name &&
        item.abbreviation === data.abbreviation,
    );

    if (!match) {
      ctx.addIssue({
        code: "custom",
        path: ["name"],
        message:
          "The name and abbreviation must match a supported degree classification.",
      });
    }
  });

  export type CreateDegreeClassificationData = z.infer<typeof createDegreeClassificationSchema>


  export const createDegreeSchema = z.object({
  degreeName: z.string().trim().min(1, "Degree name is required."),
  code: z.string().trim().min(1, "Degree code is required."),
  requiredCredits: z.number().int().positive(
    "Required credits must be a positive integer.",
  ),
  degreeClassificationId: z.number().int().positive(
    "A valid degree classification ID is required.",
  ),
});

export type CreateDegreeData = z.infer<typeof createDegreeSchema>

 export const createDegreeSchema2 = z.object({
  degreeName: z.string().trim().min(1, "Degree name is required."),
  code: z.string().trim().min(1, "Degree code is required."),
  requiredCredits: z.string().transform((value)=>Number(value)).pipe(z.number().int().positive( "Required credits must be a positive integer.",)) ,
  degreeClassificationId: z.number().int().positive(
    "A valid degree classification ID is required.",
  ),
});

export type CreateDegreeData2 = z.infer<typeof createDegreeSchema>