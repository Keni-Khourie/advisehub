import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated:boolean,
    accessToken:string,
    refreshToken:string,
    isVerified:boolean|null
}
const initialState:AuthState = {
    isAuthenticated:false,
    accessToken:"",
    refreshToken:"",
    isVerified:false
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuth:(state,action)=>{
            state.isAuthenticated=true;
            state.accessToken=action.payload.accessToken;
            state.refreshToken= action.payload.refreshToken;
            state.isVerified= true;
        },
        logout:state=>{
            state.isAuthenticated=false;
            state.accessToken="";
            state.refreshToken="";
            state.isVerified=false;
        },
    }
})

export const {setAuth,logout} = authSlice.actions;
export default authSlice.reducer;