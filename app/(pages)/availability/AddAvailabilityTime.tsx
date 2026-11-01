"use client"
import {useContext, ChangeEvent} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import WhiteButton from '@/customUI/WhiteButton';
import { Input } from "@/components/ui/input";
import {advisorAvailableTimeOptions} from "@/constants"
import {format, startOfDay, isBefore} from "date-fns"
import { combineDateAndTime } from '@/lib/utilityDateFunctions';



const AddAvailabilityTime = () => {

    const contextData = useContext(AdvisorAvailabilityContext)
    const today = startOfDay(new Date());
     function isPastDay(date: Date) {
    return isBefore(startOfDay(date), today);
  }
    const disabled = isPastDay(contextData.availabilityData.date)
    const setDate = (e:ChangeEvent<HTMLInputElement>)=>{
        
        const date = new Date(e.target.value)
       
        contextData.setAvailabilityData({...contextData.availabilityData, date:date})
      
    }
    const setTime = (e:string|null)=>{
        if(!e) return
       
         contextData.setAvailabilityData({...contextData.availabilityData, time:e})
    }

    const handleSubmit = ()=>{
        if(!contextData.availabilityData.date || !contextData.availabilityData.time) return
        const dateTime = combineDateAndTime(contextData.availabilityData.date, contextData.availabilityData.time)
        contextData.setAvailabilityData({...contextData.availabilityData,combinedDateTime:dateTime })
        console.log(dateTime);
        console.log(format(dateTime, "h:mm a, dd MMM yyyy"));
        contextData.setPageData({...contextData.pageData, dialogType:"add"})
        contextData.setDialogOpen(true)
    }

  return (
    <div className="md:w-1/2 w-full bg-white border rounded-lg px-3 py-3">
        <p className="font-semibold mb-2">Add an available time</p>
        <div className ="flex justify-between items-center  mb-10 flex-wrap md:flex-nowrap gap-y-5 gap-x-3">
            <Input type="date" className="w-full md:w-1/2" onChange={setDate} value={format(contextData.availabilityData.date!, "yyyy-MM-dd")}/>
            <Select onValueChange={setTime} value={contextData.availabilityData.time ??""}>
                <SelectTrigger className="w-full md:w-1/2">
            <SelectValue placeholder="Select available time" />
          </SelectTrigger>
                <SelectContent className="w-full md:w-1/2">
                    <SelectGroup>
                       {
                        advisorAvailableTimeOptions.map((item, index)=><SelectItem key={index} value={item.value}>{item.title}</SelectItem>)
                       } 
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div>
            {contextData.availabilityData.date && contextData.availabilityData.time &&
                <p className="text-sm"> Selected Availability: <span className="font-semibold text-ahGreen">
                    {format( combineDateAndTime(contextData.availabilityData.date, contextData.availabilityData.time), " h:mm a, iii dd MMM")}</span></p>
            }
        </div>
        <div className="flex justify-center md:justify-end">
            <WhiteButton text="+ Add Time" additionalStyle="border border-stone-200" onClick={handleSubmit} disabled={disabled}/>
        </div>
    </div>
  )
}

export default AddAvailabilityTime