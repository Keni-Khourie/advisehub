import { StudentAppointmentView, StudentAppointmentSection, StudentAppointmentComponentDetail } from "./types";

export type UserRole = "STUDENT" | "ADVISOR" | "ADMIN";



export const studentAppointmentSections:StudentAppointmentSection[] = ["Details","Time", "Review", ]
export const studentAppointmentComponentDetails:StudentAppointmentComponentDetail[] = [
    {
        header:"Schedule an Appointment",
        subtitle:"Begin the guided booking",
        view:"StudentAppointmentLanding",
        section:"Details",
    },
     {
        header:"Schedule an Advisor",
        subtitle:"Step 1 of 3",
        view:"AdvisorSelection",
        section:"Details",
    },
    {
        header:"Finding Available Appointments",
        view:"FindingAppointment",
        section:"Time",
    },
     {
        header:"Select Date & Time",
        subtitle:"Step 2 of 3",
        view:"DateSelection",
        section:"Time",
    },
     {
        header:"Review Appointment",
        subtitle:"Step 3 of 3",
        view:"AppointmentReview",
        section:"Review",
    },
    {
        header:"Creating Appointment",
        view:"CreatingAppointment",
        section:"none",
    },
     {
        header:"Confirming Appointment",
        view:"AppointmentConfirmationLoading",
        section:"none",
    },
     {
        header:"Appointment Confirmed",
        view:"AppointmentConfirmationSuccess",
        section:"none"
    },
    {
        header:"Select Date & Time",
        view:"DateSelectionConflict",
        section:"Time"
    },
]