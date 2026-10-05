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
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast"
import { loginFormSchema, LoginFormData } from "@/validators/auth/authValidationSchemas";
import { useDispatch } from "react-redux";
import { queryErrorResponse } from "@/lib/utilityComponents";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import GreenButton from "@/customUI/GreenButton";
import { cn } from "@/lib/utils";
import LoginFormHeader from "./LoginFormHeader";


const LoginForm = () => {
    const [login, { isLoading }] = useLoginMutation()
   const router = useRouter();
   const dispatch = useDispatch();
   const loginForm = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

   const trySubmitForm = (values: LoginFormData) => {
    toast.promise(
      login({
        email: values.email,
        password: values.password.trim(),
      })
        .unwrap()
        .then((resp) => {
          console.log(resp);
         
          router.push("/dashboard") 

        }),
      {
        loading: "Logging in....",
        success: "Welcome!",
        error: queryErrorResponse,
      }
    );
  };
  return (
    <div className="flex items-center justify-center place-items-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-[60%]">
       
        <LoginFormHeader/>
          <form onSubmit={loginForm.handleSubmit(trySubmitForm)} className="w-full">
              <FieldGroup className="flex gap-y-6 mb-10">
                  <Controller
                name="email"
                control={loginForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="w-full">
                    <FieldLabel htmlFor="email" className="w-full font-semibold ps-1">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="John.Smith@@baforcemultiplier.com"
                      type="text"
                      className="w-full rounded-sm"
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
                    <FieldLabel htmlFor="password" className="w-full font-semibold ps-1">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      type="password"
                      className="w-full rounded-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              </FieldGroup>
        
                  <Field className="">
                    <GreenButton text="Sign in" disabled={isLoading}/>
                  </Field>
        
        
          </form>
      </div>
    </div>
  )
}

export default LoginForm