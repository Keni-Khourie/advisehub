"use client";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  adminLoginFormSchema, 
  AdminLoginFormData
} from "@/validators/auth/authValidationSchemas";

import {  customToast } from "@/lib/utilityComponents";
import FormHeader from "./FormHeader";
import BlueButton from "@/customUI/BlueButton";
import { signIn } from "next-auth/react";
import {useState} from "react"


const AdminLoginForm = () => {
     const router = useRouter();
     
      const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginForm = useForm<AdminLoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(adminLoginFormSchema),
  });

   const trySubmitForm = async (values: AdminLoginFormData) => {
  setIsLoading(true);
  customToast("Signing in...", "info")

  try {
    const result = await signIn("admin-credentials", {
      email: values.email.trim(),
      password: values.password,
      redirect: false,
    });

    console.log("Credentials sign-in result:", result);

    if (!result || result.error || !result.ok) {
      customToast("Invalid email or password. Please try again.", "error")
      return;
    }

    customToast("Welcome!", "success")
    router.push("/user");
    router.refresh();
  } catch (error) {
    console.error("Sign-in error:", error);
    customToast("Unable to sign in. Please try again.", "error");
  } finally {
    setIsLoading(false);
  }
};
  return (
     <div className="flex justify-center w-full h-full bg-white shadow-lg rounded-xl pb-2">
      <div className="flex flex-col  items-center rounded-xl w-[90%]">
        <FormHeader/>
        <form
          onSubmit={loginForm.handleSubmit(trySubmitForm)}
          className="w-full"
        >
          <FieldGroup className="flex gap-y-6 mb-10">
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
                    placeholder="John.Smith@baforcemultiplier.com"
                    type="text"
                    className="w-full rounded-md h-12"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={loginForm.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full">
                  <FieldLabel
                    htmlFor="password"
                    className="w-full font-semibold ps-1"
                  >
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    type="password"
                    className="w-full rounded-md h-12"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Field className="">
            <BlueButton
              text={isLoading?"Signing in..." :"Sign in"}
              additionalStyle="h-15 rounded-md"
              type="submit"
              disabled={isLoading}
            />
          </Field>

          
        </form>
      </div>
    </div>
  )
}

export default AdminLoginForm