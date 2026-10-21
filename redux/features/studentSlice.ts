import { createSlice } from "@reduxjs/toolkit";
import {UserRole} from "@/types/types"

interface StudentState{
    id:number|null,
    studentId:number|null;
    enrollmentDate:string;
    expectedGraduationDate:string;
    completedCredits:number|null
    degree:string;
    degreeClassification:string;
    totalCredits:number|null
}

const initialState:StudentState = {
    id:null,
    studentId:null,
    enrollmentDate:"",
    expectedGraduationDate:"",
    completedCredits:null,
    totalCredits:null,
    degree:"",
    degreeClassification:""
}

const studentSlice = createSlice({
    name:"student",
    initialState,
      reducers:{
        setStudent: (state, action) => {
            return { ...state, ...action.payload };
          },
        clearStudent:()=>initialState
    }
})

export const {setStudent} = studentSlice.actions;
export default studentSlice.reducer
