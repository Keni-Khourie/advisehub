"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import AvailabilityTimeItem from './AvailabilityTimeItem';
import {dummyExistingAdvisorAvailabilities} from "@/dummyData/dummyData"
//import { Skeleton } from "@/components/ui/skeleton";
const AvailabilityTimes = () => {
    const contextData = useContext(AdvisorAvailabilityContext)

    //fetch existing availability
  return (
    <div className="md:w-1/2 w-full md:h-[40vh] h-56 flex flex-col gap-y-3 overflow-y-scroll">
         {dummyExistingAdvisorAvailabilities.map((availability, index)=>  <AvailabilityTimeItem key={index} existingAvailability={availability}/>)}
        
    </div>
  )
}

export default AvailabilityTimes