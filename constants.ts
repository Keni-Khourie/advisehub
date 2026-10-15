import { StudentScheduleAppointmentSection, StudentScheduleAppointmentComponentDetail, SidebarItemDetails, AppointmentSection, AppointmentComponentDetail, StudentScheduleAppointmentStep, AppointmentReason} from "./types";


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
    // {
    //     text:"Messages/Resources",
    //     link:"/messages-resources"
    // },
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

export const appointmentSections:AppointmentSection[] = ["Upcoming", "Past Meetings"]
export const studentAppointmentComponentDetails:AppointmentComponentDetail[]= [
    {
        view:"UpcomingAppointments",
        section:"Upcoming",
        header:"My Appointments",
        subtitle:"View upcoming sessions and previous meetings"
    },
    {
        view:"PastMeetings",
        section:"Past Meetings",
        header:"Meeting History",
        subtitle:"Review completed advising meetings",
    },
]

export const studentScheduleAppointmentSections:StudentScheduleAppointmentSection[] = ["Details","Time", "Review"]
export const studentScheduleAppointmentSteps:StudentScheduleAppointmentStep[] = ["Reason", "Advisor", "Date & Time", "Review", "Success"]

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
        header:"Select an Advisor",
        subtitle:"Step 2 • Compare experience and earliest availability",  
    },
    {
        view:"ReasonSelection",
        section:"Details",
        step:"Reason",
        header:"Schedule an Appointment",
        subtitle:"Step 1 • Choose the reason that best matches your need",
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
        subtitle:"Step 3 • Only conflict-free available slots can be selected.",
        
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
        step:"Success",
        header:"Appointment Confirmed",
        subtitle:"Your booking has been saved successfully."
        
    },
    {
        view:"DateSelectionConflict",
        section:"Time",
        step:"Date & Time",
        header:"Select Date & Time",
        
    },
]

export const appointmentReasons: AppointmentReason[] = [
    {
        option:"Academic Planning",
        description:"Map your courses and graduation path"
    },
    {
        option:"Course Registration",
        description:"Help selecting or changing courses"
    },
    {
        option:"Degree Requirements",
        description:"Review remaining program requirements"
    },
    {
        option:"Transfer Credits",
        description:"Questions about transferred coursework"
    },
    {
        option:"General Advising",
        description:"Ask anything that does not fit above"
    }
]

export const advisorAppointmentComponentDetails:AppointmentComponentDetail[]= [
    {
        view:"UpcomingAppointments",
        section:"Upcoming",
        header:"Appointments",
        subtitle:"Upcoming and past advising meetings."
    },
    {
        view:"PastMeetings",
        section:"Past Meetings",
        header:"Past Meetings",
        subtitle:"Completed advising sessions and outcomes.",
    },
]