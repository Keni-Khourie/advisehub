"use client"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {CreateDegreeData, createDegreeSchema } from "@/validators/api/degreeApiValidators"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {toast} from "@/components/ui/toast"
import { Button } from "@/components/ui/button";
import { useCreateDegreeMutation, useGetDegreeClassificationsQuery } from "@/redux/features/main/degreeApiSlice";
import { queryErrorResponse } from "@/lib/utilityComponents";
import { Spinner } from "@/components/ui/spinner";
import { Dispatch, SetStateAction } from "react";

interface Props{
  setRefetchData:Dispatch<SetStateAction<boolean>>
}

const CreateDegreeForm = ({setRefetchData}:Props) => {
  const [createDegree, {isLoading:isSubmitting, isSuccess, isError}] = useCreateDegreeMutation()
  const {data:degreeClassifications, isLoading} =useGetDegreeClassificationsQuery()
  
  const createDegreeForm = useForm<CreateDegreeData>({
   
    resolver:zodResolver(createDegreeSchema)
  })

  const trySubmitForm = (values:CreateDegreeData)=>{
    // console.log(values);
    toast.promise(
      createDegree(values).unwrap().then((resp)=>{console.log(resp) 
        setRefetchData(true)

      }), {
        loading:"Creating degree",
        success:"Degree created!",
        error: queryErrorResponse,
      }
    )
  }
  return (
    <div className="md:w-1/2 w-full bg-white">
      <form onSubmit={createDegreeForm .handleSubmit(trySubmitForm)} className="w-full">
        <FieldGroup>
          <Controller
          name="degreeName"
          control={createDegreeForm.control}
          render={({field, fieldState})=>(
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Degree Name
              </FieldLabel>
              <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Degree Name"
                  className="bg-white rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
            </Field>
          )}
          />
          <Controller
          name="code"
          control={createDegreeForm.control}
          render={({field, fieldState})=>(
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Degree Code
              </FieldLabel>
              <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Degree Code"
                  className="bg-white rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
            </Field>
          )}
          />
          <Controller
          name="requiredCredits"
          control={createDegreeForm.control}
          render={({field, fieldState})=>(
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Required Credits
              </FieldLabel>
              <Input
                  {...field}
                  onChange={(e)=>createDegreeForm.setValue("requiredCredits", Number(e.target.value))}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="10"
                  className="bg-white rounded-sm"
                  type="number"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
            </Field>
          )}
          />
          <Controller
          name="degreeClassificationId"
          control={createDegreeForm.control}
          render={({field, fieldState})=>(
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Degree Classification
              </FieldLabel>
              {isLoading && (<Spinner/>)}
              {degreeClassifications && (<Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={true}>
                {degreeClassifications.map((classification)=><SelectItem key={classification.id} value={classification.id}>{classification.abbreviation}</SelectItem>)}
                </SelectContent>
              </Select>)}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
            </Field>
          )}
          />
        </FieldGroup>
        <Button type="submit" disabled={isSubmitting}>Create Degree</Button>
      </form>
    </div>
  )
}

export default CreateDegreeForm