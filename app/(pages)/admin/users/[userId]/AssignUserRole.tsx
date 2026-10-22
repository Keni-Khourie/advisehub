"use client"

import { useAssignUserRoleMutation } from "@/redux/features/main/usersApiSlice";
import { UserRole } from "@/types/types";
import { Dispatch, SetStateAction} from "react";
import { AssignUserRoleData, assignUserRoleSchema } from "@/validators/api/userApiValidators";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {toast} from "@/components/ui/toast"
import { Button } from "@/components/ui/button";
import { queryErrorResponse } from "@/lib/utilityComponents";

interface Props{
  userId:number,
  setRefetch: Dispatch<SetStateAction<boolean>>,
  disableAssign:boolean
}

const AssignUserRole = ({userId, setRefetch, disableAssign}:Props) => {
    
    const [assignRole, {isLoading}] = useAssignUserRoleMutation()
    const userRoles:UserRole[] = ["ADVISOR", "STUDENT"]

    const assignUserForm = useForm<AssignUserRoleData>({
        resolver:zodResolver(assignUserRoleSchema )
    })
    const trySubmitForm = (values:AssignUserRoleData)=>{
        toast.promise(
            assignRole({
                userId,
                formData:values
            }).unwrap().then((resp)=>{
                console.log(resp)
                setRefetch(true)
            }), {
        loading:"Assigning role",
        success:"Role Assigned",
        error: queryErrorResponse,
      }
        )
    }
  return (
    <div className="bg-white p4 rounded-lg">
        <form onSubmit={assignUserForm.handleSubmit(trySubmitForm)} className="md:1/2 w-full">
        <FieldGroup>
            <Controller
          name="role"
          control={assignUserForm.control}
          render={({field, fieldState})=>(
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                role
              </FieldLabel>
              
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={true}>
                {userRoles.map((role, index)=><SelectItem key={index} value={role}>{role}</SelectItem>)}
                </SelectContent>
              </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
            </Field>
          )}
          />
        </FieldGroup>
        <Button type="submit" disabled={disableAssign}>{isLoading?"assigning":"assign role"}</Button>
        </form>
    </div>
  )
}

export default AssignUserRole