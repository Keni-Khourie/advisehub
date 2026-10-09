export interface ErrorResponse {
    data: {
      message?: string;
      detail?: string;
    };
  }
export type UserRole = "STUDENT" | "ADVISOR" | "ADMIN";
export interface GenericMessageResponse{
  message:string
}
export interface SidebarItemDetails{
    text:string;
    link:string;
}
export interface SelectItemData {
  title: string;
  value: string;
}

export type StudentAppointmentView = "UpcomingAppointments"|"PastMeetings"

export type StudentScheduleAppointmentView = "AdvisorSelection"|"AppointmentConfirmationLoading"|"AppointmentConfirmationSuccess"|"AppointmentReview"|"DateSelection"|"DateSelectionConflict"|"StudentScheduleAppointmentLanding"|"FindingAppointment"| "CreatingAppointment"
export type StudentAppointmentSection = "Details"|"Time"|"Review"|"none"

export interface StudentAppointmentComponentDetail{
    header:string;
    subtitle?:string;
    view:StudentScheduleAppointmentView,
    section:StudentAppointmentSection,
}
export type AdvisorSpecialization = "Degree Planning"|"Course Selection" |"Graduation Requirements" | "Transfer Questions"|"Career" |"General"

//Dummy Data
