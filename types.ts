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

//Dummy Data
export interface Degree{
  id:number;
  name:string;
  code:string,
  type:DegreeType,
  noOfRequiredCredits:number
}
export interface Course{
  id:number;
  name:string;
  code:string;
  credits:number
}
export interface Student{
  id:number;
  userId:number;
  degree:Degree;
  enrollmentDate:Date;
  expectedGraduationDate:Date;
  courses:Course[];
  grades:Grade[];
  degreeCompletion:number;
}

export interface Advisor{
  id:number;
  userId:number;
  office:string;
  specialization:Specialization[]
}
export interface Grade{
  id:number
  studentId:number
  courseId:number
  score:number;
  grading:Grading
}

//the following types will be tables in the database consisting of Id and name
export type Specialization ="Career"|"Graduation"|"General"
export type DegreeType ="Bsc."|"MSc"|"PhD"
export type Grading = "PASS"|"FAIL"|"DISTINCTION"