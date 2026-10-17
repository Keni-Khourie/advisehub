"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { queryErrorResponse } from "@/lib/utilityComponents";
import WhiteButton from "@/customUI/WhiteButton";
import BlueButton from "@/customUI/BlueButton";
import { cn } from "@/lib/utils";
import { CreateAdvisingNoteData, createAdvisingNoteSchema } from "@/validators/app/advisorValidationSchemas";


interface Props{
  studentId:number
}
const CreateStudentAdvisingNoteForm = ({studentId}:Props) => {
     const createNoteForm = useForm<CreateAdvisingNoteData>({
        defaultValues:{
            studentId,
            noteTitle:"",
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
    <div className="w-full">
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
                        <Input {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="Enter note title" className="bg-white"/>
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
                        <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} placeholder="Enter advising note" rows={20} className="bg-white"/>
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
                        <InputTags {...field} id={field.name} placeholder="" className="bg-white" aria-invalid={fieldState.invalid}/>
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
                } onBlur={field.onBlur} aria-invalid={fieldState.invalid} className="bg-ahGreen"/>
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
            <div className="flex justify-between items-center mt-5 md:flex-nowrap flex-wrap gap-y-4 ">
                <WhiteButton text="Cancel" type="button" onClick={()=>createNoteForm.reset()} disabled={createNoteForm.formState.isSubmitting} additionalStyle="w-full md:w-1/6 border border-ahGrey shadow-sm"/>

                 <BlueButton text={createNoteForm.formState.isSubmitting
          ? "Saving note..."
          : "Save Note"} additionalStyle="w-full md:w-1/6" type="submit"
        disabled={createNoteForm.formState.isSubmitting}/>   
            </div>
        </form>
    </div>
  )
}

export default CreateStudentAdvisingNoteForm