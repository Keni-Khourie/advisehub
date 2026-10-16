"use client"
import {useState} from "react"
import { queryErrorResponse } from "@/lib/utilityComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import BlueButton from "@/customUI/BlueButton";
import WhiteButton from "@/customUI/WhiteButton"
import { Textarea } from "@/components/ui/textarea";
import { CreateAdvisingNoteData, createAdvisingNoteSchema } from "@/validators/app/advisorValidationSchemas";


const CreateAdvisingNoteForm = () => {
    const createNoteForm = useForm<CreateAdvisingNoteData>({
        defaultValues:{}
    })



  return (
    <div>
        <form>
            <FieldGroup>
                <Controller
              name="email"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel
                    htmlFor="email"
                    className="w-full font-semibold ps-1"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Degree Placement"
                    type="text"
                    className="w-full rounded-md h-12"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            </FieldGroup>
        </form>
    </div>
  )
}

export default CreateAdvisingNoteForm