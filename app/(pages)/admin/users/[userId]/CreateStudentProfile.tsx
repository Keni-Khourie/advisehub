"use client";
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
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { useGetDegreesQuery } from "@/redux/features/main/degreeApiSlice";
import { queryErrorResponse } from "@/lib/utilityComponents";
import { Spinner } from "@/components/ui/spinner";
import {
  CreateStudentData,
  createStudentSchema,
} from "@/validators/api/studentApiValidators";
import { useCreateStudentMutation } from "@/redux/features/main/studentApiSlice";

interface Props {
  userId: number;
  disableAssign:boolean
}
const CreateStudentProfile = ({ userId, disableAssign }: Props) => {
  const { data: degrees, isLoading } = useGetDegreesQuery();
  const [createStudent, { isLoading:isSubmitting }] = useCreateStudentMutation();

  const createStudentForm = useForm<CreateStudentData>({
    defaultValues:{
        studentId:"",
        enrollmentDate:"",
        expectedGraduationDate:"",
        completedCredits:undefined
    },
    resolver: zodResolver(createStudentSchema),
  });
  const trySubmitForm = (values: CreateStudentData) => {
    toast.promise(
      createStudent({
        userId,
        formData: values,
      })
        .unwrap()
        .then((resp) => console.log(resp)),
      {
        loading: "Creating student",
        success: "Student created!",
        error: queryErrorResponse,
      },
    );
  };
  return (
    <div className="bg-white p4 rounded-lg mt-5">
      <form
        onSubmit={createStudentForm.handleSubmit(trySubmitForm)}
        className=""
      >
        <FieldGroup>
          <Controller
            name="studentId"
            control={createStudentForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Student ID</FieldLabel>
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
            name="completedCredits"
            control={createStudentForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Completed Credits</FieldLabel>
                <Input
                  {...field}
                  onChange={(e)=>createStudentForm.setValue("completedCredits", Number(e.target.value))}
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
            name="enrollmentDate"
            control={createStudentForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enrollment Date</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="date"
                  className="bg-white rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="expectedGraduationDate"
            control={createStudentForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Expected Graduation Date
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="date"
                  className="bg-white rounded-sm"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="degreeId"
            control={createStudentForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Degree</FieldLabel>
                {isLoading && <Spinner />}
                {degrees && (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={true}>
                      {degrees.map((degree) => (
                        <SelectItem key={degree.id} value={degree.id}>
                          {degree.degreeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button type="submit" disabled={isSubmitting|| disableAssign}>{isSubmitting?"Creating Student":"Create Student"}</Button>
      </form>
    </div>
  );
};

export default CreateStudentProfile;
