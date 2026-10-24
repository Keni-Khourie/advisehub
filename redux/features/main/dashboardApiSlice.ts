import { ApiSlice } from "@/redux/services/apiSlice";
import { AppointmentStatus, AdvisorSpecialization } from "@/types/types";

export interface StudentDashboardData{
    closestAppointment:{
        id:number;
        appointmentStatus:AppointmentStatus
        date:string;
        advisorTitle:string;
        advisorFullName:string;
        advisorSpecialization:AdvisorSpecialization;
    },
    degreeInfo:{
        degreeProgressPercent:number;
        completedCredits:number;
        remainingCredits:number;
        degreeName:string;
        degreeClassification:string;
    },
    pastAppointmentsCount:number;
    todaysNotesCount:number
}

export interface AdvisorDashboardData{
    availableSlotsTodayCount:number;
    appointmentsTodayCount:number;
}

const dashboardApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getStudentDashboardData:builder.query<StudentDashboardData, string>({
            query:(timeZone)=>({
                url:"/dashboard/student",
                method:"GET",
                params:new URLSearchParams({ timeZone })
            })
        }),
        getAdvisorDashboardData:builder.query<AdvisorDashboardData, string>({
            query:(timeZone)=>({
                url:"/dashboard/advisor",
                method:"GET",
                params:new URLSearchParams({ timeZone })
            })
        }),
    })
})

export const {useGetAdvisorDashboardDataQuery, useGetStudentDashboardDataQuery} = dashboardApiSlice 
export default dashboardApiSlice.reducer