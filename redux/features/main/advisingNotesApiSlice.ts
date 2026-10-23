import { CreateAdvisingNoteData, createAdvisingNoteSchema } from "@/validators/app/advisorValidationSchemas";
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


const advisingNotesApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
      createAdvisingNote:builder.mutation<AdvisorNoteResponseData, CreateAdvisingNoteData>({
        query:(formData)=>({
          url:"/advisor-notes/create",
          method:"POST",
          body:formData
        }),
        invalidatesTags:["AdvisingNotes"]
      })
    })
})

export const {useCreateAdvisingNoteMutation} =advisingNotesApiSlice
export default advisingNotesApiSlice.reducer