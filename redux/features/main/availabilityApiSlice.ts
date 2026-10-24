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
    id:number
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

interface StudentAvailabilityQueryParams{
    advisorId:number;
    date:string;
    timeZone:string
}

interface AdvisorAvailabilityQueryParams{
    date:string;
    timeZone:string
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
        getAvailabilitiesByDateForAdvisor:builder.query<AdvisorAvailabilityListData[], AdvisorAvailabilityQueryParams>({
            query:({date, timeZone})=>({
                url:"/advisor-availability",
                method:"GET",
                params:{
                    date:date,
                    timeZone:encodeURIComponent(timeZone)
                }
            }),
            providesTags:["AvailabilityTimes"]
        }),
        getAvailabilitiesByDateForStudent:builder.query<AdvisorAvailabilityStudentListData[], StudentAvailabilityQueryParams>({
            query:({advisorId, date, timeZone})=>({
                url:`/advisor/availability/${advisorId}`,
                method:"GET",
                params:{
                    date:date,
                    timeZone:encodeURIComponent(timeZone)
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


