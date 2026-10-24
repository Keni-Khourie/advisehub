import { ApiSlice } from "@/redux/services/apiSlice";
import {CreateAdvisorAvailabilityData} from "@/validators/api/availabilityApiValidators"

export interface AdvisorAvailabilityData{
        id: number;
        dateTime: string,
        advisorId: string,
        createdAt:string
}
export interface AdvisorAvailabilityListData{
        id: number;
        dateTime: string,
        advisorId: string, //advisors advisorID
        hasAppointment:boolean
        createdAt:string
}
export interface AdvisorAvailabilityStudentListData{
    dateTime: string;
        advisorId: string; //advisors advisorID
        hasAppointment: boolean;
        createdAt: string;
}
export interface AvailabilityDeletionResponse{
        message: string;
        id: number;
        dateTime: string;
      }

interface AdvisorAvailabilityQueryParams{
    advisorId:number;
    date:string
}

const availabilityApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        addAdvisorAvailability:builder.mutation<AdvisorAvailabilityData,CreateAdvisorAvailabilityData>({
            query:(formData)=>({
                url:"/advisor-availability",
                method:"POST",
                body:formData
            }),
            invalidatesTags:["AvailabilityTimes"]
        }),
        getAvailabilitiesByDateForAdvisor:builder.query<AdvisorAvailabilityListData[], string>({
            query:(dateString)=>({
                url:"/advisor-availability",
                method:"GET",
                params:{
                    date:dateString
                }
            }),
            providesTags:["AvailabilityTimes"]
        }),
        getAvailabilitiesByDateForStudent:builder.query<AdvisorAvailabilityStudentListData[], AdvisorAvailabilityQueryParams>({
            query:({advisorId, date})=>({
                url:`/advisor/availability/${advisorId}`,
                method:"GET",
                params:{
                    date:date
                }
            }),
            providesTags:["AvailabilityTimes"]
        }),
        deleteAdvisorAvailability:builder.mutation<AvailabilityDeletionResponse, number>({
            query:(availabilityId)=>({
                url:`/advisor-availability/${availabilityId}`,
                method:"DELETE"
            }),
            invalidatesTags:(data)=>data?["AvailabilityTimes", {type:"AvailabilityTimes", id:data.id}]:[]
        }),
        
    })
})

export const {useAddAdvisorAvailabilityMutation, useDeleteAdvisorAvailabilityMutation, useGetAvailabilitiesByDateForAdvisorQuery, useGetAvailabilitiesByDateForStudentQuery} = availabilityApiSlice
export default availabilityApiSlice.reducer


