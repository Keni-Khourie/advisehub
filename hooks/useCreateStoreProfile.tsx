import { useEffect } from "react"
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";
import { useRouter } from "next/navigation";
import React from 'react'

const useCreateStoreProfile = () => {
    const router = useRouter()
    const user = useAppSelector((state: RootState) => state.user);
    useEffect(()=>{
        if(!user.profileId|| user?.profileId===null)
            router.push("/create-profile")
    },[user.profileId, router])
  return 
}

export default useCreateStoreProfile