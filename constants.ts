import { StudentScheduleAppointmentSection, StudentScheduleAppointmentComponentDetail, SidebarItemDetails, StudentAppointmentSection, StudentAppointmentComponentDetail } from "./types";



export const studentSidebarItems: SidebarItemDetails[] =[
    {
        text:"Dashboard",
        link:"/dashboard"
    },
    {
        text:"Appointments",
        link:"/appointments"
    },
    {
        text:"Degree Progress",
        link:"/degree-progress"
    },
    {
        text:"Advising Notes",
        link:"/advising-notes"
    },
    {
        text:"Messages/Resources",
        link:"/messages-resources"
    },
]

export const advisorSidebarItems:SidebarItemDetails[] =[
    {
        text:"Dashboard",
        link:"/dashboard"
    },
    {
        text:"Availability",
        link:"/availability"
    },
    {
        text:"Appointments",
        link:"/appointments"
    },
    {
        text:"Students",
        link:"/students"
    },
    {
        text:"Advising Notes",
        link:"/advising-notes"
    },
]

export const studentAppointmentSections:StudentAppointmentSection[] = ["Upcoming", "Past Meetings"]
export const studentAppointmentComponentDetails:StudentAppointmentComponentDetail[]= [
    {
        view:"UpcomingAppointments",
        section:"Upcoming",
        header:"Upcoming Appointments",
        subtitle:""
    },
    {
        view:"PastMeetings",
        section:"Past Meetings",
        header:"Past Meetings",
    },
]

export const studentScheduleAppointmentSections:StudentScheduleAppointmentSection[] = ["Details","Time", "Review", ]

export const studentScheduleAppointmentComponentDetails:StudentScheduleAppointmentComponentDetail[] = [
    {
        header:"Schedule an Appointment",
        subtitle:"Begin the guided booking",
        view:"StudentScheduleAppointmentLanding",
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
