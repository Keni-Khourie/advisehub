"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import { cn } from "@/lib/utils";

const AvailabilityTimeItem = () => {
    const contextData = useContext(AdvisorAvailabilityContext)
    
    const isSelected = false
  return (
    <div className={cn("border text-center bg-white h-10 w-full px-3 py-2 rounded-lg font-semibold hover:border-2 hover:border-ahGreen cursor-pointer", isSelected &&"bg-ahBgBlue border-2 border-ahGreen")}>{`9:00 AM`}</div>
  )
}

export default AvailabilityTimeItem