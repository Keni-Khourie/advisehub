export interface ErrorResponse {
    data: {
      message?: string;
      detail?: string;
    };
  }

export interface GenericMessageResponse{
  message:string
}

export interface SelectItemData {
  title: string;
  value: string;
}

export type StudentAppointmentView = "AdvisorSelection"|"AppointmentConfirmationLoading"|"AppointmentConfirmationSuccess"|"AppointmentReview"|"DateSelection"|"DateSelectionConflict"|"StudentAppointmentLanding"|"FindingAppointment"| "CreatingAppointment"
export type StudentAppointmentSection = "Details"|"Time"|"Review"|"none"

export interface StudentAppointmentComponentDetail{
    header:string;
    subtitle?:string;
    view:StudentAppointmentView,
    section:StudentAppointmentSection,
}
export type AdvisorSpecialization = "Degree Planning"|"Course Selection" |"Graduation Requirements" | "Transfer Questions"|"Career" |"General"

//Dummy Data
