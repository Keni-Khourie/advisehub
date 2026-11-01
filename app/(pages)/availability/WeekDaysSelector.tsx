"use client"
import {useContext, useState, useMemo} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import { ChevronRight, ChevronLeft } from "lucide-react";
import {cn} from "@/lib/utils"
import {
  addDays,
  addWeeks,
  format,
  isSameDay,
  startOfDay,
  startOfWeek,
  subWeeks,
} from "date-fns";
import {Button} from "@/components/ui/button"
const WeekDaysSelector = () => {
    const contextData = useContext(AdvisorAvailabilityContext)
    const today = startOfDay(new Date());
    const [selectedDate, setSelectedDate] = useState(
    () => startOfDay(contextData.availabilityData.date!)
  );
  const weekStart = startOfWeek(selectedDate, {
    weekStartsOn: 1,
  });
  // function isPastDay(date: Date) {
  //   return isBefore(startOfDay(date), today);
  // }
  const weekDays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) =>
        addDays(weekStart, index)
      ),
    [weekStart]
  );
  function goToNextWeek() {
    setSelectedDate((previous) => addWeeks(previous, 1));
    contextData.setAvailabilityData((previous)=>({...contextData.availabilityData, date:addWeeks(startOfWeek(previous.date, {
    weekStartsOn: 1,
  }),1)}))
  }
  function goToPreviousWeek(){
    setSelectedDate((previous) => subWeeks(previous, 1));
    contextData.setAvailabilityData((previous)=>({...contextData.availabilityData, date:subWeeks(startOfWeek(previous.date, {
    weekStartsOn: 1,
  }),1)}))
  }
  const setAvailabilityDate = (date:Date)=>{
    setSelectedDate(date)
    contextData.setAvailabilityData({...contextData.availabilityData, date:date})
    console.log(date.toISOString());
  }
  return (
    <div className="mb-8 w-full">
        <p className="text-lg font-semibold mb-4">
            {isSameDay(
              weekStart,
              startOfWeek(today, { weekStartsOn: 1 })
            )
              ? "This week"
              : `${format(weekStart, "MMM d")} - ${format(
                  addDays(weekStart, 6),
                  "MMM d"
                )}`}
        </p>
        <div className="flex items-center justify-between w-full">
          <Button className="bg-transparent hover:bg-transparent text-black cursor-pointer" onClick={goToPreviousWeek}>
                <ChevronLeft size={40} />
            </Button>
            <div className="flex items-center gap-x-5 w-full">
                {weekDays.map((day) => {
            const selected = isSameDay(day, contextData.availabilityData.date);
            // const disableButton = isPastDay(day);

            return (
              <Button
                key={day.toISOString()}
                type="button"
    
                aria-pressed={selected}
                onClick={() => setAvailabilityDate(day)}
                className={cn(
                  "bg-white border rounded-lg px-4 py-6 text-center w-1/6 cursor-pointer hover:bg-stone-100 text-ahTextBlack disabled:cursor-not-allowed disabled:opacity-40",
                  (format(day, "ii")==="06"||format(day, "ii")==="07") && "hidden",
                  selected
                    ? "border-ahGreen bg-white text-ahGreen font-semibold"
                    : "border-stone-200 bg-white hover:border-ahGreen",
            )}
              >
                {format(day, "iii d")}
              </Button>
            );
          })}
                {/* <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Mon 11</div>
                 <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Tue 11</div>
                  <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Wed 11</div>
                   <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Thur 11</div>
                    <div className="bg-white border rounded-lg px-4 py-3 text-center w-1/6 cursor-pointer hover:bg-stone-100"> Fri 11</div> */}
            </div>
            <Button className="bg-transparent hover:bg-transparent text-black cursor-pointer" onClick={goToNextWeek}>
                <ChevronRight size={40} />
            </Button>
            
        </div>
    </div>
  )
}

export default WeekDaysSelector