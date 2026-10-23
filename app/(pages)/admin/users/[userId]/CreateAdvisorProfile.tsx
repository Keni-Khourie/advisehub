"use client"
import { useCreateAdvisorMutation } from "@/redux/features/main/advisorApiSlice";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AdvisorSpecialization } from "@/types/types";
import { CreateAdvisorData, createAdvisorSchema } from "@/validators/api/advisorApiValidators";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {toast} from "@/components/ui/toast"
import { Button } from "@/components/ui/button";
import { queryErrorResponse } from "@/lib/utilityComponents";

interface Props{
  userId:number,
  disableAssign:boolean
}
const CreateAdvisorProfile = ({userId, disableAssign}:Props) => {
const specializations:AdvisorSpecialization[] = ["Academic Planning", "Course Registration", "Degree Requirements", "Transfer Credits", "General Advising"]
const [createAdvisor, {isLoading}] = useCreateAdvisorMutation()

const createAdvisorForm = useForm<CreateAdvisorData>({
  resolver: zodResolver(createAdvisorSchema)
})
const trySubmitForm = (values:CreateAdvisorData)=>{
  toast.promise(
    createAdvisor({
      userId,
      formData:values
    }).unwrap(). then((resp)=>{console.log(resp)}),
    {
      loading:"Creating Advisor",
      success:"Advisor created!",
      error:queryErrorResponse,
    }
  )
}
  return (
    <div className="bg-white p4 rounded-lg mt-5">
      <form onSubmit={createAdvisorForm.handleSubmit(trySubmitForm)} className="">
        <FieldGroup>
           <Controller
            name="advisorId"
            control={createAdvisorForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Advisor ID</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Must be 8 digits"
                  className="bg-white rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="title"
            control={createAdvisorForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Dr"
                  className="bg-white rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="office"
            control={createAdvisorForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Advisor Office</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Advising Center, Room 5"
                  className="bg-white rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="yearsOfExperience"
            control={createAdvisorForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Years of experience</FieldLabel>
                <Input
                  {...field}
                  onChange={(e)=>createAdvisorForm.setValue("yearsOfExperience", Number(e.target.value))}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="number"
                  className="bg-white rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
           <Controller
          name="specialization"
          control={createAdvisorForm.control}
          render={({field, fieldState})=>(
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Specialization
              </FieldLabel>
              
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={true}>
                {specializations.map((specialization, index)=><SelectItem key={index} value={specialization}>{specialization}</SelectItem>)}
                </SelectContent>
              </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
            </Field>
          )}
          />
          </FieldGroup>
        <Button type="submit" disabled={isLoading||disableAssign}>Add Advisor</Button>
      </form>
    </div>
  )
}

export default CreateAdvisorProfile

/*
studentID, degreeId, enrollmentDate, expectedGraduationDate, the completedCredits
 */