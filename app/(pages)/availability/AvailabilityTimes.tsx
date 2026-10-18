"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import AvailabilityTimeItem from './AvailabilityTimeItem';

const AvailabilityTimes = () => {
    const contextData = useContext(AdvisorAvailabilityContext)
  return (
    <div className="md:w-1/2 w-full md:h-[40vh] flex flex-col gap-y-3 overflow-y-scroll">
       <AvailabilityTimeItem/>
       <AvailabilityTimeItem/>
       <AvailabilityTimeItem/>
       <AvailabilityTimeItem/>
       <AvailabilityTimeItem/>
       <AvailabilityTimeItem/>
       <AvailabilityTimeItem/>
       <AvailabilityTimeItem/>
       <AvailabilityTimeItem/>
       <AvailabilityTimeItem/>
        
    </div>
  )
}

export default AvailabilityTimes