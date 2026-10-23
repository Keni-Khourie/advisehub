import {
  CreateAdvisingNoteData,
  createAdvisingNoteSchema,
} from "@/validators/app/advisorValidationSchemas";
import { ApiSlice } from "@/redux/services/apiSlice";


const advisingNotesApiSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=>({})
})