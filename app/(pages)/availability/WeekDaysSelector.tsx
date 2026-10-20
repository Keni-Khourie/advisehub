"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import { ChevronRight } from "lucide-react";
import {cn} from "@/lib/utils"
import {
  addDays,
  addWeeks,
  format,
  isBefore,
  isSameDay,
  isSameMinute,
  parseISO,
  setHours,
  setMinutes,
  startOfDay,
  startOfWeek,
} from "date-fns";
const WeekDaysSelector = () => {
    const contextData = useContext(AdvisorAvailabilityContext)
  return (
    <div className="mb-8 w-full">
        <p className="text-lg font-semibold mb-4">This Week</p>
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-x-5 w-full">
                <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Mon 11</div>
                 <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Tue 11</div>
                  <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Wed 11</div>
                   <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Thur 11</div>
                    <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Fri 11</div>
            </div>
            <ChevronRight className=""/>
        </div>
    </div>
  )
}

export default WeekDaysSelector