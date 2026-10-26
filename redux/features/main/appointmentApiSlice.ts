import { ApiSlice } from "@/redux/services/apiSlice";
import { CreateAppointmentData } from "@/validators/api/appointmentApiValidators";
import { AppointmentStatus, AdvisorSpecialization } from "@/types/types";
interface CreateAppointmentResponse {
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

export interface AppointmentDataForStudent {
  id: number;
  advisorTitle: string;
  advisorId: string;
  advisorFullName: string;
  advisorSpecialization: AdvisorSpecialization;
  advisorOffice: string;
  advisorProfileImage: string;
  date: string;
  appointmentStatus: AppointmentStatus;
}
export interface AppointmentDataForAdvisor {
  id: number;
  studentId: string;
  studentFullName: string;
  studentDegree: string;
  studentProfileImage: string;
  date: string;
  appointmentStatus: AppointmentStatus;
}

export interface AppointmentData {
  id: number;
  studentId: string;
  studentFullName: string;
  studentDegree: string;
  studentProfileImage: string;
  studentEmail:string;
  date: string;
  note:string;
  appointmentStatus: AppointmentStatus;
  advisorTitle: string;
  advisorId: string;
  advisorFullName: string;
  advisorSpecialization: AdvisorSpecialization;
  advisorOffice: string;
  advisorProfileImage: string;
  advisorEmail:string;
}
interface AppointmentFilter {
  period: "today" | "previous" | "upcoming";
  timeZone: string;
}
interface AppointmentCancellationResponse {
   message: string;
  id: number;
  appointmentStatus: "CANCELLED",
}

const appointmentApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation<
      CreateAppointmentResponse,
      CreateAppointmentData
    >({
      query: (formData) => ({
        url: "/appointments",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Appointments"],
    }),
    getAdvisorAppointments: builder.query<
      AppointmentDataForAdvisor[],
      AppointmentFilter
    >({
      query: ({ period, timeZone }) => ({
        url: "/appointments/advisor",
        method: "GET",
        params: new URLSearchParams({
          period,
          timeZone,
        }),
      }),
      providesTags: ["Appointments"],
    }),
    getStudentAppointments: builder.query<
      AppointmentDataForStudent[],
      AppointmentFilter
    >({
      query: ({ period, timeZone }) => ({
        url: "/appointments/student",
        method: "GET",
        params: new URLSearchParams({
          period,
          timeZone,
        }),
      }),
      providesTags: ["Appointments"],
    }),
    getAppointmentById:builder.query<AppointmentData, {appointmentId:number, timeZone:string}>({
        query:({timeZone, appointmentId})=>({
            url: `/appointments/${appointmentId}`,
            method:"GET",
            params: new URLSearchParams({timeZone})
        }),
        providesTags:(data)=>data?["Appointments", {type:"Appointments", id:data.id}]:[]
    }),
    cancelAppointment:builder.mutation<AppointmentCancellationResponse, number>({
      query:(appointmentId)=>({
        url:`/appointments/${appointmentId}`,
        method:"PATCH",
      }),
      invalidatesTags:(data)=>data?["Appointments","AvailabilityTimes", {type:"Appointments", id:data.id}]:[]
    })
  }),
});

export const { useCreateAppointmentMutation, useGetAdvisorAppointmentsQuery, useGetStudentAppointmentsQuery, useGetAppointmentByIdQuery, useCancelAppointmentMutation } = appointmentApiSlice;
export default appointmentApiSlice.reducer;
