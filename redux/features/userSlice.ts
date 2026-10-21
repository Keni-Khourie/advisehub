import { createSlice } from "@reduxjs/toolkit";
import {UserRole} from "@/types/types"

interface UserState{
    id:number|null;
    email:string;
    firstName:string;
    lastName:string;
    image:string|null
    role:UserRole|null

}

const initialState:UserState = {
    id:null,
    email: "",
    firstName: "",
    lastName: "",
    image:null,
    role: null,
   
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser: (state, action) => {
            return { ...state, ...action.payload };
          },
        clearUser:()=>initialState
    }
})

export const {setUser} = userSlice.actions;
export default userSlice.reducer;