"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
const WeekDaysSelector = () => {
    const contextData = useContext(AdvisorAvailabilityContext)
  return (
    <div className="mb-8 w-full">
        <p className="text-lg font-semibold mb-4">This Week</p>
        <div className="flex items-center gap-x-5">
            <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Mon 11</div>
             <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Tue 11</div>
              <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Wed 11</div>
               <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Thur 11</div>
                <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Fri 11</div>
        </div>
    </div>
  )
}

export default WeekDaysSelector