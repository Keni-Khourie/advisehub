import { ApiSlice } from "@/redux/services/apiSlice";
import {CreateAppointmentData} from "@/validators/api/appointmentApiValidators"
import {AppointmentStatus} from "@/types/types"
interface CreateAppointmentResponse{
 advisor: {
 advisorId: string;
 firstName: string;
 lastName: string;
 title: string | null;
 };
 availability: {
 id: number;
 } | null;
 createdAt: Date;
 date: Date;
 id: number;
 note: string | null;
 specialization: {
 name: string;
 };
 status: AppointmentStatus;
 student: {
 studentId: string;
 };
}

const appointmentApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createAppointment:builder.mutation<CreateAppointmentResponse,CreateAppointmentData>({
            query:(formData)=>({
                url:"/appointments",
                method:"POST",
                body:formData
            }),
            invalidatesTags:["Appointments"]
        }),
    })
})

export const {useCreateAppointmentMutation} = appointmentApiSlice
export default appointmentApiSlice.reducer