"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast"
import { loginFormSchema, LoginFormData } from "@/validators/auth/authValidationSchemas";
import { useDispatch } from "react-redux";
import { queryErrorResponse } from "@/lib/utilityComponents";


const LoginForm = () => {
    const [login, { isLoading }] = useLoginMutation();
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
    <div>
        <form></form>
    </div>
  )
}

export default LoginForm