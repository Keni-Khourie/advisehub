import { ApiSlice } from "@/redux/services/apiSlice";
export interface AdvisorSpecializationResponseData{
      id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
}

const advisorApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAdvisorSpecializations:builder.query<AdvisorSpecializationResponseData, void>({
            query:()=>({
                url:"/advisor/specialization",
                method:"GET"
            }),
            providesTags:["AdvisorSpecializations"]
        }),
    })
})

export const {useGetAdvisorSpecializationsQuery} = advisorApiSlice
export default advisorApiSlice.reducer