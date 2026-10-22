"use client"
import { useGetAdvisorSpecializationsQuery } from "@/redux/features/main/advisorApiSlice";

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
import {CreateDegreeData, createDegreeSchema } from "@/validators/api/degreeApiValidators"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {toast} from "@/components/ui/toast"
import { Button } from "@/components/ui/button";
import { queryErrorResponse } from "@/lib/utilityComponents";
import { Spinner } from "@/components/ui/spinner";

interface Props{
  userId:number
}
const CreateAdvisorProfile = ({userId}:Props) => {
  const {data:specializations} = useGetAdvisorSpecializationsQuery()
  return (
    <div className="bg-white p4 rounded-lg mt-5">CreateAdvisorProfile</div>
  )
}

export default CreateAdvisorProfile

/*
studentID, degreeId, enrollmentDate, expectedGraduationDate, the completedCredits
 */