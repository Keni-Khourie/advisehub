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
export type StudentAppointmentSection = "Upcoming"|"Past Meetings"
export interface StudentAppointmentComponentDetail{
  view:StudentAppointmentView;
  section:StudentAppointmentSection;
  header:string;
  subtitle?:string;
}

export type StudentScheduleAppointmentView = "AdvisorSelection"|"AppointmentConfirmationLoading"|"AppointmentConfirmationSuccess"|"AppointmentReview"|"DateSelection"|"DateSelectionConflict"|"StudentScheduleAppointmentLanding"|"FindingAppointment"| "CreatingAppointment"|"ReasonSelection"
export type StudentScheduleAppointmentSection = "Details"|"Time"|"Review"|"none"
export type StudentScheduleAppointmentStep = "Reason"|"Advisor"|"Date & Time"|"Review"|"none"

export interface StudentScheduleAppointmentComponentDetail{
    header:string;
    subtitle?:string;
    view:StudentScheduleAppointmentView,
    section:StudentScheduleAppointmentSection,
    step:StudentScheduleAppointmentStep
}
export type AdvisorSpecialization = "Academic Planning" | "Course Registration" | "Degree Requirements" | "Transfer Credits"| "General Advising"


