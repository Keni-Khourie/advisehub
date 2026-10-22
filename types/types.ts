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

export type AppointmentView = "UpcomingAppointments"|"PastMeetings"
export type AppointmentSection = "Upcoming"|"Past Meetings"
export interface AppointmentComponentDetail{
  view:AppointmentView;
  section:AppointmentSection;
  header:string;
  subtitle?:string;
}

export type StudentScheduleAppointmentView = "AdvisorSelection"|"AppointmentConfirmationLoading"|"AppointmentConfirmationSuccess"|"AppointmentReview"|"DateSelection"|"DateSelectionConflict"|"StudentScheduleAppointmentLanding"|"FindingAppointment"| "CreatingAppointment"|"ReasonSelection"
export type StudentScheduleAppointmentSection = "Details"|"Time"|"Review"|"none"
export type StudentScheduleAppointmentStep = "Reason"|"Advisor"|"Date & Time"|"Review"|"Success"|"none"

export interface StudentScheduleAppointmentComponentDetail{
    header:string;
    subtitle?:string;
    view:StudentScheduleAppointmentView,
    section:StudentScheduleAppointmentSection,
    step:StudentScheduleAppointmentStep
}
export type AdvisorSpecialization = "Academic Planning" | "Course Registration" | "Degree Requirements" | "Transfer Credits"| "General Advising"

export interface AppointmentReason {
  option:AdvisorSpecialization;
  description:string;
}


export interface SelectItemData{
  title:string;
  value:string;
}




export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole | null;
  image: string | null;
  student: Student | null;

  advisor: Advisor | null;

  admin: {
    id: number;
  } | null;
}


export interface Student {
    id: number;
    studentId: string;
    enrollmentDate: string;
    expectedGraduationDate: string;
    completedCredits: number;
    degree: Degree;
  }
   export interface Advisor{
    id: number;
    advisorId: string;
    title: string | null;
    office: string;
    yearsOfExperience: number;
    specialization:Specialization
  }
export interface Degree {
      id: number;
      degreeName: string;
      code: string;
      degreeClassification: string;
      requiredCredits: number;
    };

    export interface Specialization {
      id: number;
      name: string;
    };

    export interface ValidDegreeClassification{
      name:string;
      abbreviation:string
    }