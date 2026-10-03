import {
  
  LoginFormData,
  AdminLoginFormData
  
} from "@/validators/auth/authValidationSchemas";
import { ApiSlice } from "../services/apiSlice";
 
import { GenericMessageResponse } from "@/types";
import { UserRole } from "@/constants";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  firstName:string;
  lastName:string;
  email: string;
  role: UserRole
}



const authApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormData>({
      query: (formData) => ({
        url: "api/login",
        method: "POST",
        body: formData,
      }),
    }),
     adminLogin: builder.mutation<LoginResponse, AdminLoginFormData>({
      query: (formData) => ({
        url: "api/login",
        method: "POST",
        body: formData,
      }),
    }),
    
   
    
   
  
  }),
});
export const { useLoginMutation, useAdminLoginMutation,} = authApiSlice;
export default authApiSlice.reducer;
