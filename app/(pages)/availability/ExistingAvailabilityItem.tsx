"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import {format} from "date-fns"
import {Trash} from "lucide-react"
import {AdvisorAvailabilityListData,} from "@/redux/features/main/availabilityApiSlice"

interface Props{
    existingAvailability:AdvisorAvailabilityListData
}
const ExistingAvailabilityItem = ({existingAvailability}:Props) => {
    const contextData = useContext(AdvisorAvailabilityContext)
    const selectAvailabilityTime = ()=>{
       
        contextData.setPageData({...contextData.pageData,selectedExistingAvailability:existingAvailability, dialogType:"add"})
        contextData.setDialogOpen(true)
    }
  return (
    <div className="border rounded-lg text-center font-semibold flex items-center justify-between text-sm px-3 py-3">
    <p>{format(existingAvailability.dateTime, "h:mm a")}</p>
    
    <Trash className="w-4 h-4 text-red-500 cursor-pointer" onClick={selectAvailabilityTime}/>
    </div>
  )
}

export default ExistingAvailabilityItem