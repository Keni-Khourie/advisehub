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
import { Checkbox } from "@/components/ui/checkbox"
import {Textarea} from "@/components/ui/textarea"
import {InputTags} from "@/customUI/InputTags"
import BlueButton from "@/customUI/BlueButton";
import WhiteButton from "@/customUI/WhiteButton"
import { CreateAdvisingNoteData, createAdvisingNoteSchema } from "@/validators/app/advisorValidationSchemas";

interface Props{
  studentId:number|undefined
}

const CreateAdvisingNoteForm = ({studentId}:Props) => {
  const createNoteForm = useForm<CreateAdvisingNoteData>({
        defaultValues:{
            studentId,
            noteTitle:undefined,
            noteContent:undefined,
            nextSteps:undefined,
            isPrivate:false
        },
        resolver:zodResolver(createAdvisingNoteSchema),
    })
    const trySubmitForm = (values:CreateAdvisingNoteData)=>{
        console.log(values);
    }
  return (
    <div>
        <form onSubmit={createNoteForm.handleSubmit(trySubmitForm)} className="w-full">
            <FieldGroup>
                <FieldLegend>Note title</FieldLegend>
                <Controller
                name="noteTitle"
                control={createNoteForm.control}
                render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="noteTitle" className="">
                            Note Title
                        </FieldLabel>
                        <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="Enter note title" type="text" className=""/>
                        {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                    </Field>
                )}
                />

                <FieldLegend>AdvisingNote</FieldLegend>
                <Controller
                name="noteContent"
                control={createNoteForm.control}
                render={({field, fieldState})=>(
                    <Field data-invalid={fieldState.invalid}              
>
                        <FieldLabel htmlFor="noteContent" className="">
                            Advising Note
                        </FieldLabel>
                        <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="Enter advising note" rows={8} className=""/>
                        {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                    </Field>
                )}
                />
                <FieldLegend>Next Steps</FieldLegend>
                 <Controller
                name="nextSteps"
                control={createNoteForm.control}
                render={({field, fieldState})=>(
                    <Field>
                        <FieldLabel htmlFor="nextSteps" className="">
                            Next Steps
                        </FieldLabel>
                        <InputTags {...field} id={field.name} placeholder="" className="" aria-invalid={fieldState.invalid}/>
                        {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                    </Field>
                )}
                />

                <FieldLegend>Note Visibility</FieldLegend>
                 <Controller
                name="isPrivate"
                control={createNoteForm.control}
                render={({ field, fieldState})=>(
                    <Field orientation="horizontal"
              data-invalid={fieldState.invalid}>
                        
                       
                        <Checkbox  id={field.name} name={field.name} checked={field.value} onCheckedChange={(checked) =>
                  field.onChange(checked === true)
                } onBlur={field.onBlur} aria-invalid={fieldState.invalid} className=""/>
                 <FieldLabel htmlFor="isPrivate" className="">
                           Keep this note private
                        </FieldLabel>
                        <FieldDescription>
                  Only you and the student can see this. Other advisor cannot view it.
                </FieldDescription>
                        {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                    </Field>
                )}
                />
            </FieldGroup>
            <div className="flex justify-between mt-5">
                <WhiteButton text="Cancel" type="button" onClick={()=>createNoteForm.reset()} disabled={createNoteForm.formState.isSubmitting}/>

                 <BlueButton text={createNoteForm.formState.isSubmitting
          ? "Saving note..."
          : "Save Note"} type="submit"
        disabled={createNoteForm.formState.isSubmitting}/>   
            </div>
        </form>
    </div>
  )
}

export default CreateAdvisingNoteForm