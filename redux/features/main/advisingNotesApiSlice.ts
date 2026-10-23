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
     
    })
})

export const {useCreateAdvisingNoteMutation, useGetPublicAdvisingNotesQuery, useGetAdvisorAdvisingNotesQuery, useGetAdvisingNoteByIdForAdvisorQuery, useGetAdvisingNoteByIdForStudentQuery, useGetStudentAdvisingNotesForAdvisorQuery, useGetStudentAdvisingNotesForStudentQuery} =advisingNotesApiSlice
export default advisingNotesApiSlice.reducer

/**
 * MAP
 {
  useGetPublicAdvisingNotesQuery: To get all public advising notes for the advisors shared hub

  useGetAdvisorAdvisingNotesQuery: This is to get the advising notes made by the advisor making the query

  useGetStudentAdvisingNotesForAdvisorQuery: This is the advisor's view. it will get all the public advising notes other advisors made about that student and the private one you made about them 

  useGetStudentAdvisingNotesForStudentQuery: This is the student's view. it will get all the notes, public and private made about that student.

  useGetAdvisingNoteByIdForAdvisorQuery: get note by Id, Advisor view

  useGetAdvisingNoteByIdForStudentQuery: get note by ID, student's view
 
  }
 */