"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import { cn } from "@/lib/utils";
import {format} from "date-fns"
import {Trash} from "lucide-react"
import { DummyExistingAdvisorAvailability } from "@/dummyData/dummyTypes";
import { Badge } from "@/components/ui/badge";

interface Props{
    existingAvailability:DummyExistingAdvisorAvailability
}
const AvailabilityTimeItem = ({existingAvailability}:Props) => {
    const contextData = useContext(AdvisorAvailabilityContext)
     const selectAvailabilityTime = ()=>{
       
        contextData.setPageData({selectedExistingAvailability:existingAvailability, dialogType:"delete"})
        contextData.setDialogOpen(true)
    }
    
    const isSelected = false
  return (
    <div className={cn("border text-center bg-white h-10 w-full px-3 py-2 rounded-lg font-semibold hover:border-2 hover:border-ahGreen cursor-pointer flex items-center justify-between", isSelected &&"bg-ahBgBlue border-2 border-ahGreen")}>
         <p>{format(existingAvailability.availability, "h:mm a")}</p>
         <div className="flex items-center gap-x-8">
            <Badge className={cn("text-xs px-5 py-1", existingAvailability.isBooked?"bg-green-100 text-green-500 opacity-60":"bg-stone-100 text-stone-500 opacity-60")}>{existingAvailability.isBooked?"Booked":"Available"}</Badge>
          <Trash className="w-4 h-4 text-red-500 cursor-pointer" onClick={selectAvailabilityTime}/>
         </div>
    </div>
  )
}

export default AvailabilityTimeItem