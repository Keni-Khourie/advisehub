import { ApiSlice } from "@/redux/services/apiSlice";
import { AppointmentStatus, AdvisorSpecialization } from "@/types/types";

export interface ClosestAppointmentData{
    id:number;
        appointmentStatus:AppointmentStatus
        date:string;
        advisorTitle:string;
        advisorFullName:string;
        advisorSpecialization:AdvisorSpecialization;
}
export interface DashboardDegreeInfo{
    degreeProgressPercent:number;
        completedCredits:number;
        remainingCredits:number;
        degreeName:string;
        degreeClassification:string;
}

export interface StudentDashboardData{
    closestAppointment:ClosestAppointmentData|null,
    degreeInfo:DashboardDegreeInfo
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