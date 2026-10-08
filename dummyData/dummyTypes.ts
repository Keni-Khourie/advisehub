import { AdvisorSpecialization } from "@/types";

export interface DummyAdvisor{
    id:number;
    specialization:AdvisorSpecialization,
    office:string;
    yearsOfExperience:number;
    jobTitle:string;
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
  userId:number;
  degree:DummyDegree;
  enrollmentDate:Date;
  expectedGraduationDate:Date;
  courses:DummyCourse[];
  grades:DummyGrade[];
  degreeCompletion:number;
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