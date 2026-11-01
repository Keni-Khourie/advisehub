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
  loginFormSchema,
  LoginFormData,
} from "@/validators/auth/authValidationSchemas";
import {  customToast } from "@/lib/utilityComponents";
import LoginFormHeader from "./LoginFormHeader";
import { Button } from "@/components/ui/button";
import BlueButton from "@/customUI/BlueButton";
import { FaUniversity } from "react-icons/fa";
import { signIn } from "next-auth/react";
import {useState} from "react"

const TestUserLoginForm = () => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginForm = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const institutionalSign =()=>{
    signIn("microsoft-entra-id", {
          redirectTo: "/user",
        })
  }

  // const testUserSign = ()=>{ 
  //   signIn("test-credentials", {
  //     redirectTo:"/user"
  //   })
  // }

const trySubmitForm = async (values: LoginFormData) => {
  setIsLoading(true);
  customToast("Signing in...", "info")

  try {
    const result = await signIn("test-credentials", {
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
        <LoginFormHeader />
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

          <div className="mt-5 w-full">
            <div className="flex items-center gap-x-3 w-full justify-center mb-5">
              <hr className="w-full mt-1" />
              <p className="font-light text-ahTextGrey">or</p>
              <hr className="w-full mt-1" />
            </div>
            <Button className="border border-ahDeepBlue text-ahDeepBlue h-12 bg-white w-full hover:bg-white hover:underline cursor-pointer font-semibold relative" onClick={institutionalSign}>
              <FaUniversity className="md:absolute md:left-6 md:top-4" />
              Use Campus Credentials (SSO)
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestUserLoginForm;
