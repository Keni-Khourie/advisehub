"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import { cn } from "@/lib/utils";
import {format} from "date-fns"
import {Trash} from "lucide-react"
import { Badge } from "@/components/ui/badge";
import {AdvisorAvailabilityListData,} from "@/redux/features/main/availabilityApiSlice"
interface Props{
    existingAvailability:AdvisorAvailabilityListData
}
const AvailabilityTimeItem = ({existingAvailability}:Props) => {
    const contextData = useContext(AdvisorAvailabilityContext)
     const selectAvailabilityTime = ()=>{
       
        contextData.setPageData({...contextData.pageData, selectedExistingAvailability:existingAvailability, dialogType:"delete"})
        contextData.setDialogOpen(true)
    }
    
    const isSelected = false
  return (
    <div className={cn("border text-center bg-white h-10 w-full px-3 py-2 rounded-lg font-semibold hover:border-2 hover:border-ahGreen cursor-pointer flex items-center justify-between", isSelected &&"bg-ahBgBlue border-2 border-ahGreen")}>
         <p>{format(existingAvailability.dateTime, "h:mm a")}</p>
         <div className="flex items-center gap-x-8">
            <Badge className={cn("text-xs px-5 py-1", existingAvailability.hasAppointment?"bg-green-100 text-green-500 opacity-60":"bg-stone-100 text-stone-500 opacity-60")}>{existingAvailability.hasAppointment?"Booked":"Available"}</Badge>
          {!existingAvailability.hasAppointment &&  <Trash className="w-4 h-4 text-red-500 cursor-pointer" onClick={selectAvailabilityTime}/>}
         </div>
    </div>
  )
}

export default AvailabilityTimeItem