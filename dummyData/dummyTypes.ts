import { AdvisorSpecialization } from "@/types";

export interface DummyAdvisor{
    id:number;
    specialization:AdvisorSpecialization,
    office:string;
    yearsOfExperience:number;
    jobTitle:string;
    closestAvailability:string;
    fullName:string;
    title:string
}

export interface DummyDegree{
  id:number;
  name:string;
  code:string,
  classification:DummyDegreeClassification,
  noOfRequiredCredits:number
}
export interface DummyCourse{
  id:number;
  name:string;
  code:string;
  credits:number
}
export interface DummyStudent{
  id:number;
  studentId:number;
  fullName:string;
  degree:string;
  enrollmentDate:string;
  expectedGraduationDate:string;
  degreeCompletionPercent:number;
  completedCredits:number;
  remainingCredits:number;
}


export interface DummyGrade{
  id:number
  studentId:number
  courseId:number
  score:number;
  grading:DummyGrading
}

//the following types will be tables in the database consisting of Id and name

export type DummyDegreeClassification ="Bsc."|"MSc"|"PhD"
export type DummyGrading = "PASS"|"FAIL"|"DISTINCTION"

//query appointment database. Get appointment by Id add filter to toggle between upcoming and past. upcoming will produce results where appointment date is AFTER current date/time and previous would give results where date and time is before
export interface ExistingMeetingData{
  id:number;
  startDateTime:string;
  endDateTime:string;
  meetingReason:AdvisorSpecialization;
  advisor:string;
  advisorOffice:string;
  status:"UPCOMING"|"CONCLUDED"|"CANCELLED"
}

export interface DummyStudentAdvisingNote{
  id:number;
  advisor:string;
  advisorTitle:string;
  meetingDate:string;
  meetingReason:AdvisorSpecialization
  noteTitle:string;
  note:string;
  nextSteps:string[]
}

export interface DummyAdvisorAppointments{
  id:number;
  studentId:number;
  studentName:string;
  appointmentDateTime:string;
  meetingReason:AdvisorSpecialization
}

export interface DummyAdvisorNote{
  id:number;
  studentId:number;
  studentFullName:string;
  advisorId:number;
  advisorFullName:string;
  meetingId:number
  meetingReason:AdvisorSpecialization
  meetingDateTime:string;
  noteTitle:string;
  note:string;
  nextSteps:string[]
}