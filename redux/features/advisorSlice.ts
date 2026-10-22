import { createSlice } from "@reduxjs/toolkit";
//import {UserRole} from "@/types/types"

interface AdvisorState{
    id:number|null;
    advisorId:number|null;
    title:string;
    office:string;
    yearsOfExperience:number|null
    specialization:string;
}

const initialState:AdvisorState = {
    id:null,
    advisorId:null,
    title:"",
    office:"",
    yearsOfExperience:null,
    specialization:""
}

const advisorSlice = createSlice({
    name:"advisor",
    initialState, 
    reducers:{
        setAdvisor: (state, action) => {
            return { ...state, ...action.payload };
          },
        clearAdvisor:()=>initialState
    }
})

export const {setAdvisor} = advisorSlice.actions
export default advisorSlice.reducer