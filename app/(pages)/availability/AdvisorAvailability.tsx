"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";
import AvailabilityContent from './AvailabilityContent';
import {startOfDay} from "date-fns"
import {AdvisorAvailabilityListData} from "@/redux/features/main/availabilityApiSlice"
export interface AvailabilityData{
    date:Date;
    time:string|undefined;
    combinedDateTime:string|undefined;
}
export interface PageData{
selectedExistingAvailability:AdvisorAvailabilityListData|undefined
dialogType:"add"|"delete"|"none",
isLoading:boolean
}

interface AdvisorAvailabilityContextData{
    availabilityData:AvailabilityData;
    setAvailabilityData:Dispatch<SetStateAction<AvailabilityData>>;
    pageData:PageData,
    setPageData:Dispatch<SetStateAction<PageData>>;
    dialogOpen:boolean;
    setDialogOpen:Dispatch<SetStateAction<boolean>>;
    refetchData:boolean;
    setRefetchData:Dispatch<SetStateAction<boolean>>;
    isLoading:boolean;
    setIsLoading:Dispatch<SetStateAction<boolean>>;
}
const today = startOfDay(new Date());
export const AdvisorAvailabilityContext = createContext<AdvisorAvailabilityContextData>({
    availabilityData:{
        date: today,
        time:undefined,
        combinedDateTime:undefined
    },
    setAvailabilityData:()=>{},
    pageData:{
        selectedExistingAvailability:undefined,
        dialogType:"add",
        isLoading:false
    },
    setPageData:()=>{},
    dialogOpen:false,
    setDialogOpen:()=>{},
    refetchData:false,
    setRefetchData:()=>{},
    isLoading:false,
    setIsLoading:()=>{}

})

const AdvisorAvailability = () => {
    const [availabilityData,setAvailabilityData] = useState<AvailabilityData>({
       date:today,
       time:undefined,
       combinedDateTime:undefined 
    })
    const [pageData, setPageData] = useState<PageData>({
        selectedExistingAvailability:undefined,
        dialogType:"add",
        isLoading:false,
    })
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [refetchData, setRefetchData] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <AdvisorAvailabilityContext.Provider value={{availabilityData, setAvailabilityData, dialogOpen, setDialogOpen,pageData, setPageData,refetchData, setRefetchData, isLoading, setIsLoading}}>
        <AvailabilityContent/>
    </AdvisorAvailabilityContext.Provider>
  )
}

export default AdvisorAvailability