"use client"
import {useEffect} from "react"
import { queryErrorResponse } from "@/lib/utilityComponents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import {Textarea} from "@/components/ui/textarea"
import {InputTags} from "@/customUI/InputTags"
import BlueButton from "@/customUI/BlueButton";
import WhiteButton from "@/customUI/WhiteButton"
import { CreateAdvisingNoteData, createAdvisingNoteSchema } from "@/validators/app/advisorValidationSchemas";
import { useCreateAdvisingNoteMutation } from "@/redux/features/main/advisingNotesApiSlice";
import { useRouter } from "next/navigation";


interface Props{
  studentId:string|undefined
}

const CreateAdvisingNoteForm = ({studentId}:Props) => {
  const [createAdvisingNote, {isLoading:isSubmitting}] = useCreateAdvisingNoteMutation()
  const router = useRouter()
  const createNoteForm = useForm<CreateAdvisingNoteData>({
        defaultValues:{
            studentId:studentId??"",
            title:"",
            content:undefined,
            nextSteps:undefined,
            isPrivate:false
        },
        resolver:zodResolver(createAdvisingNoteSchema),
    })
    const trySubmitForm = (values:CreateAdvisingNoteData)=>
      {
        if(studentId)
        
          createNoteForm.setValue("studentId", studentId)
      console.log(values);
        toast.promise(
          createAdvisingNote(values).unwrap().then((resp)=>{
            console.log(resp)
            router.push("/advising-notes")
          }),
          {
            loading:"Saving Note",
            success:"Note Saved!",
            error:queryErrorResponse
          }
        )

    }

    useEffect(()=>{
      if(studentId)
         createNoteForm.setValue("studentId", studentId)
    }, [studentId, createNoteForm])
  return (
    <div>
       <form
        onSubmit={createNoteForm.handleSubmit(trySubmitForm, (errors) => {
    console.log("VALIDATION FAILED:", errors); console.log(studentId);
  })}
        className="w-full"
      >
        
        <FieldGroup>
          <Controller
            name="title"
            control={createNoteForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="font-semibold text-base"
                >
                  Note Title
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter note title"
                  className="bg-white rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="content"
            control={createNoteForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="font-semibold text-base"
                >
                  Advising Note
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your notes for student"
                  className="bg-white h-40"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="nextSteps"
            control={createNoteForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-base font-semibold"
                >
                  Next Steps
                </FieldLabel>
                <InputTags
                  {...field}
                  id={field.name}
                  placeholder="Add recommended next steps for student to take"
                  className="bg-white"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="isPrivate"
            control={createNoteForm.control}
            render={({ field, fieldState }) => (
              <Field  data-invalid={fieldState.invalid}>
                 <FieldLabel htmlFor={field.name} className="text-base font-semibold">
                  Note visibility
                </FieldLabel>
                <div className="flex gap-x-3 items-center">
                    <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                  onBlur={field.onBlur}
                  aria-invalid={fieldState.invalid}
                  className="data-checked:bg-ahGreen data-checked:border-ahGreen w-5 h-5 md:w-5 md:h-5 shadow-sm "
                />
                <div className="flex flex-col justify-center">
                    <p className="font-semibold text-sm">Keep this note private</p>
                     <FieldDescription>
                  Only you and the student can see this. Other advisor cannot
                  view it.
                </FieldDescription>
                </div>
                </div>
                
               
               
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex justify-between items-center mt-5 md:flex-nowrap flex-wrap gap-y-4 ">
          <WhiteButton
            text="Cancel"
            type="button"
            onClick={() => createNoteForm.reset()}
            disabled={createNoteForm.formState.isSubmitting}
            additionalStyle="w-full md:w-1/6 border border-ahGrey shadow-sm"
          />
          
          <BlueButton
            text={
              createNoteForm.formState.isSubmitting
                ? "Saving note..."
                : "Save Note"
            }
            additionalStyle="w-full md:w-1/6"
            type="submit"
            disabled={createNoteForm.formState.isSubmitting|| isSubmitting}
          />
        </div>
      </form>
     
    </div>
  )
}

export default CreateAdvisingNoteForm