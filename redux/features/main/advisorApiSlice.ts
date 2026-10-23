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
  }),
});

export const { useGetAdvisorSpecializationsQuery, useCreateAdvisorMutation } =
  advisorApiSlice;
export default advisorApiSlice.reducer;
