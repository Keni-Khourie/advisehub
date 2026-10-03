"use client";
import { redirect, usePathname } from "next/navigation";
import React from "react"
import { useSelector } from "react-redux";
import { RootState } from "./store";


export const AuthWrapper = ({children}:{children:React.ReactNode}) => {
    const pathName = usePathname();
    const auth = useSelector((state:RootState)=>state.auth);
    const freeRoutes = ["/","/login"];
    
    // if(!auth.isAuthenticated && !auth.refreshToken && (!freeRoutes.includes(pathName)) ){
    //     redirect('/');
        
    // }
    // if(auth.isAuthenticated && auth.isVerified){
    //   redirect("/")
    // }
  return (
    <>
    {children}</>
  )
}
