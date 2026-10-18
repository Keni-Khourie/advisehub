"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";
import AvailabilityContent from './AvailabilityContent';

export interface AvailabilityData{
    date:Date|undefined
    time:string|undefined
}

interface AdvisorAvailabilityContextData{
    availabilityData:AvailabilityData;
    setAvailabilityData:Dispatch<SetStateAction<AvailabilityData>>
}

export const AdvisorAvailabilityContext = createContext<AdvisorAvailabilityContextData>({
    availabilityData:{
        date:undefined,
        time:undefined,
    },
    setAvailabilityData:()=>{}

})

const AdvisorAvailability = () => {
    const [availabilityData,setAvailabilityData] = useState<AvailabilityData>({
       date:undefined,
       time:undefined 
    })
  return (
    <AdvisorAvailabilityContext.Provider value={{availabilityData, setAvailabilityData}}>
        <AvailabilityContent/>
    </AdvisorAvailabilityContext.Provider>
  )
}

export default AdvisorAvailability