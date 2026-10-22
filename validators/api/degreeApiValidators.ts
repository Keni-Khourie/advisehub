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