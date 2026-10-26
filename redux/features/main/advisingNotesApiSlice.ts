import { CreateAdvisingNoteData} from "@/validators/app/advisorValidationSchemas";
import { ApiSlice } from "@/redux/services/apiSlice";

export interface AdvisorNoteResponseData {
 advisor: {
 advisorId: string;
 firstName: string;
 lastName: string;
 title: string | null;
 };
 content: string;
 createdAt: Date;
 id: number;
 isPrivate: boolean;
 nextSteps: string[];
 student: {
 firstName: string;
 lastName: string;
 studentId: string;
 };
 title: string;
 updatedAt: Date;
}
export interface PublicAdvisorNote {
    id: number;
    advisorFullName: string;
    createdAt: string;
    advisorSpecialization: string;
    title: string;
    nextSteps: string[];
    content: string;
    studentFullName: string;
    studentDegree: string;
    advisorId: string;
    studentId: string;
}

export interface PrivateAdvisorNote{
  id: number;
  title: string;
  content: string;
  nextSteps: string[];
  isPrivate:boolean;
    createdAt: string;
    updatedAt:string[];
    advisorId: string;
    advisorFullName: string;
    advisorSpecialization: string;
    studentProfileImage?:string|undefined;
    studentId: string;
    studentFullName: string;
    studentDegree: string;
    
}

export interface StudentNoteForAdvisor {
    id: number;
    advisorFullName: string;
    createdAt: string;
    advisorSpecialization: string;
    title: string;
    nextSteps: string[];
    content: string;
    advisorId: string;
}
export interface StudentNoteForStudent{
  id:number
  title: string;
  content: string;
  isPrivate:boolean;
  nextSteps: string[];
  advisorFullName: string;
  advisorTitle:string
  advisorProfileImage?:string;
  advisorSpecialization: string;
  createdAt: string;
}
export interface AdvisorNotesAboutStudent{
  id: number;
  title: string;
  content: string;
  nextSteps: string[];
  isPrivate:boolean;
  createdAt: string;
}
//ROUTE: /api/advisor-notes/student/student-note/[noteId]
const advisingNotesApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
      createAdvisingNote:builder.mutation<AdvisorNoteResponseData, CreateAdvisingNoteData>({
        query:(formData)=>({
          url:"/advisor-notes/create",
          method:"POST",
          body:formData
        }),
        invalidatesTags:["AdvisingNotes"]
      }),
      getPublicAdvisingNotes:builder.query<PublicAdvisorNote[], void>({
        query:()=>({
          url:"/advisor-notes",
          method:"GET"
        }),
        providesTags:["AdvisingNotes"]
      }),
      getAdvisorAdvisingNotes:builder.query<PrivateAdvisorNote[], void>({
        query:()=>({
          url:"/advisor-notes/mine",
          method:"GET"
        }),
        providesTags:["AdvisingNotes"]
      }),
      getAdvisingNoteByIdForAdvisor:builder.query<PrivateAdvisorNote, number>({
        query:(noteId)=>({
          url:`/advisor-notes/${noteId}`,
          method:"GET"
        }),
        providesTags:(data)=>data?["AdvisingNotes", {type:"AdvisingNotes", id:data.id}]:[]
      }), 
       getAdvisingNoteByIdForStudent:builder.query<StudentNoteForStudent, number>({
        query:(noteId)=>({
          url: `/advisor-notes/${noteId}/student`,
          method:"GET"
        }),
        providesTags:(data)=>data?["AdvisingNotes", {type:"AdvisingNotes", id:data.id}]:[]
      }),
      getStudentAdvisingNotesForAdvisor:builder.query<StudentNoteForAdvisor[], number>({
        query:(studentId)=>({
          url: `/advisor-notes/student/${studentId}`,
          method:"GET"
        }),
        providesTags:["AdvisingNotes"]
      }),
      getStudentAdvisingNotesForStudent:builder.query<StudentNoteForStudent[], void>({
        query:()=>({
          url: `/advisor-notes/student/`,
          method:"GET"
        }),
        providesTags:["AdvisingNotes"]
      }),
      getNotesAboutStudentByAdvisorForAdvisor:builder.query<AdvisorNotesAboutStudent, number>({
        query:(studentId)=>({
          url:`advisor-notes/mine/student/${studentId}`,
          method:"GET"
        }),
        providesTags:["AdvisingNotes"]
      }),
      getNotesAboutStudentByAdvisorForStudent:builder.query<AdvisorNotesAboutStudent, number>({
        query:(advisorId)=>({
          url:`/advisor-notes/student/advisor/${advisorId}`,
          method:"GET"
        }),
        providesTags:["AdvisingNotes"]
      }),
     
    })
})

export const {useCreateAdvisingNoteMutation, useGetPublicAdvisingNotesQuery, useGetAdvisorAdvisingNotesQuery, useGetAdvisingNoteByIdForAdvisorQuery, useGetAdvisingNoteByIdForStudentQuery, useGetStudentAdvisingNotesForAdvisorQuery, useGetStudentAdvisingNotesForStudentQuery, useGetNotesAboutStudentByAdvisorForAdvisorQuery, useGetNotesAboutStudentByAdvisorForStudentQuery} =advisingNotesApiSlice
export default advisingNotesApiSlice.reducer

/**
 * MAP
 {
  useGetPublicAdvisingNotesQuery: To get all public advising notes for the advisors shared hub

  useGetAdvisorAdvisingNotesQuery: This is to get the advising notes made by the advisor making the query

  useGetStudentAdvisingNotesForAdvisorQuery: This is the advisor's view. it will get all the public advising notes other advisors made about that student and the private one you made about them 
  useGetNotesAboutStudentByAdvisorForAdvisor: This is for the advisor's view. it will get all the notes a specific advisor has made about a student. The student's ID will be passed in with the query

  useGetStudentAdvisingNotesForStudentQuery: This is the student's view. it will get all the notes, public and private made about that student.

  useGetNotesAboutStudentByAdvisorForStudent: This is for the student's view. it will get all the notes a specific advisor has made about a student. The advisor's ID will be passed in with the query

  useGetAdvisingNoteByIdForAdvisorQuery: get note by Id, Advisor view

  useGetAdvisingNoteByIdForStudentQuery: get note by ID, student's view


 
  }
 */