import { ApiSlice } from "@/redux/services/apiSlice";
import { UserRole, AdvisorSpecialization } from "@/types/types";
import { CreateAdvisorData } from "@/validators/api/advisorApiValidators";

export interface AdvisorResponseData {
  advisorId: string;
  createdAt: Date;
  firstName: string;
  id: number;
  lastName: string;
  office: string;
  specialization: {
    id: number;
    name: AdvisorSpecialization;
  };
  title: string | null;
  user: {
    email: string;
    id: number;
    role: UserRole | null;
  };
  yearsOfExperience: number;
}
export interface AdvisorSpecializationResponseData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface AdvisorResponseForStudent{
  advisorId: string
    specialization: string
    office: string,
    yearsOfExperience: number,
    closestAvailability: string,
    fullName: string,
    title: string,
    advisorProfileImg: string
}

const advisorApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdvisorSpecializations: builder.query<
      AdvisorSpecializationResponseData,
      void
    >({
      query: () => ({
        url: "/advisor/specialization",
        method: "GET",
      }),
      providesTags: ["AdvisorSpecializations"],
    }),
    createAdvisor: builder.mutation<
      AdvisorResponseData,
      { userId: number; formData: CreateAdvisorData }
    >({
      query: ({ userId, formData }) => ({
        url: `/users/${userId}/advisor`,
        method: "POST",
        body: formData,
      }),
    }),

    getAdvisorBySpecialization: builder.query<AdvisorResponseForStudent[], AdvisorSpecialization|undefined>({
      query:(specialization)=>({
        url:"/advisor",
        method:"GET",
        params:{
          specialization
        }
      }),
      providesTags:["Advisors"]
    }),
    
  }),
});

export const { useGetAdvisorSpecializationsQuery, useCreateAdvisorMutation, useGetAdvisorBySpecializationQuery } =
  advisorApiSlice;
export default advisorApiSlice.reducer;
