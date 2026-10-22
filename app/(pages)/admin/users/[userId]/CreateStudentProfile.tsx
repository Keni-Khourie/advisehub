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
import { useGetDegreesQuery } from "@/redux/features/main/degreeApiSlice";
import { queryErrorResponse } from "@/lib/utilityComponents";
import { Spinner } from "@/components/ui/spinner";

import { Dispatch, SetStateAction } from "react";

interface Props{
  userId:number,
}
const CreateStudentProfile = ({userId}:Props) => {
  return (
    <div className="bg-white p4 rounded-lg mt-5">CreateStudentProfile</div>
  )
}

export default CreateStudentProfile