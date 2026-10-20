"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";
import AvailabilityContent from './AvailabilityContent';
import { DummyExistingAdvisorAvailability } from "@/dummyData/dummyTypes";

export interface AvailabilityData{
    date:Date|undefined;
    time:string|undefined;
    combinedDateTime:string|undefined;
}
export interface PageData{
selectedExistingAvailability:DummyExistingAdvisorAvailability|undefined
dialogType:"add"|"delete"|"none"
}

interface AdvisorAvailabilityContextData{
    availabilityData:AvailabilityData;
    setAvailabilityData:Dispatch<SetStateAction<AvailabilityData>>;
    pageData:PageData,
    setPageData:Dispatch<SetStateAction<PageData>>;
    dialogOpen:boolean;
    setDialogOpen:Dispatch<SetStateAction<boolean>>;
}

export const AdvisorAvailabilityContext = createContext<AdvisorAvailabilityContextData>({
    availabilityData:{
        date: new Date(),
        time:undefined,
        combinedDateTime:undefined
    },
    setAvailabilityData:()=>{},
    pageData:{
        selectedExistingAvailability:undefined,
        dialogType:"add"
    },
    setPageData:()=>{},
    dialogOpen:false,
    setDialogOpen:()=>{}

})

const AdvisorAvailability = () => {
    const [availabilityData,setAvailabilityData] = useState<AvailabilityData>({
       date:new Date(),
       time:undefined,
       combinedDateTime:undefined 
    })
    const [pageData, setPageData] = useState<PageData>({
        selectedExistingAvailability:undefined,
        dialogType:"add"
    })
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  return (
    <AdvisorAvailabilityContext.Provider value={{availabilityData, setAvailabilityData, dialogOpen, setDialogOpen,pageData, setPageData}}>
        <AvailabilityContent/>
    </AdvisorAvailabilityContext.Provider>
  )
}

export default AdvisorAvailability