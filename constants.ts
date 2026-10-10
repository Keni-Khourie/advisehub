import { StudentScheduleAppointmentSection, StudentScheduleAppointmentComponentDetail, SidebarItemDetails, StudentAppointmentSection, StudentAppointmentComponentDetail, StudentScheduleAppointmentStep} from "./types";


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

export const studentScheduleAppointmentSections:StudentScheduleAppointmentSection[] = ["Details","Time", "Review"]
export const studentScheduleAppointmentSteps:StudentScheduleAppointmentStep[] = ["Reason", "Advisor", "Date & Time", "Review"]

export const studentScheduleAppointmentComponentDetails:StudentScheduleAppointmentComponentDetail[] = [
    {
        view:"StudentScheduleAppointmentLanding",
        section:"Details",
        step:"none",
        header:"Schedule an Appointment",
        subtitle:"Begin the guided booking",
        
    },
     {
       view:"AdvisorSelection",
        section:"Details",
        step:"Advisor",
        header:"Schedule an Advisor",
        subtitle:"Step 1 of 3",  
    },
    {
        view:"ReasonSelection",
        section:"Details",
        step:"Reason",
        header:"Schedule an Appointment",
        subtitle:"Choose a reason for advising",
    }, 
    {
        view:"FindingAppointment",
        section:"Time",
        step:"Date & Time",
        header:"Finding Available Appointments",
        
    },
     {
        view:"DateSelection",
        section:"Time",
        step:"Date & Time",
        header:"Select Date & Time",
        subtitle:"Step 2 of 3",
        
    },
     {
        view:"AppointmentReview",
        section:"Review",
        step:"Review",
        header:"Review Appointment",
        subtitle:"Step 3 of 3",
        
    },
    {
        view:"CreatingAppointment",
        section:"none",
        step:"none",
        header:"Creating Appointment",
        
    },
     {
        view:"AppointmentConfirmationLoading",
        section:"none",
        step:"none",
        header:"Confirming Appointment",
        
    },
     {
        view:"AppointmentConfirmationSuccess",
        section:"none",
        step:"none",
        header:"Appointment Confirmed",
        
    },
    {
        view:"DateSelectionConflict",
        section:"Time",
        step:"Date & Time",
        header:"Select Date & Time",
        
    },
]
