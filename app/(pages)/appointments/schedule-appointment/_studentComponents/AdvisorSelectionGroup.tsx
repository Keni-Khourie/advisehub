"use client";
import { useContext } from "react";
import { StudentScheduleAppointmentContext } from "./StudentAppointmentSchedule";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CardAvatar from "@/customUI/CardAvatar";
import { Skeleton } from '@/components/ui/skeleton';
import {generateArray} from "@/lib/utilityFunctions"
import {useGetAdvisorBySpecializationQuery, AdvisorResponseForStudent} from "@/redux/features/main/advisorApiSlice"
import FetchErrorMessage from "@/customUI/FetchErrorMessage"
import {format, startOfDay,  isSameDay} from "date-fns"
const AdvisorSelectionGroup = () => {
  //fetch advisors for advisor select (API:getAdvisors with nearest available time)
  //add skeletons for loading
  const today = startOfDay(new Date());
  const contextData = useContext(StudentScheduleAppointmentContext);

  const {data:advisors, isLoading, isError} =useGetAdvisorBySpecializationQuery(contextData.appointmentDetails.appointmentReason)

  const updateAdvisorSelection = (advisor:AdvisorResponseForStudent) => {
    
    contextData.setAppointmentDetails({...contextData.appointmentDetails, advisorId:advisor.advisorId, advisor:advisor})
  };
console.log(advisors);

  return (
    <div>
      {isLoading && (<div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
        {generateArray(6).map((item)=><Skeleton key={item} className="w-full h-28"/>)}
      </div>)}
      {advisors && <RadioGroup
        className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5"
        value={contextData.appointmentDetails.advisor??{}}
        onValueChange={updateAdvisorSelection}
      >
        
        {advisors.map((advisor, index) => (
          <div
            key={index}
            className={cn("bg-white p-3 rounded-lg shadow-md focus:border-ahGreen active:border-ahGreen checked:border-ahGreen hover:border-ahGreen w-full border",contextData.appointmentDetails.advisorId===advisor.advisorId &&"border-2 border-ahGreen")}
          >
            <div className="w-full flex justify-between">
              <Label
                htmlFor={`${advisor.advisorId}`}
                className="flex gap-x-3 cursor-pointer"
              >
                <div>
                  <CardAvatar fullName={advisor.fullName} imageUrl={advisor.advisorProfileImg}/>
                  
                </div>
                <div className="font-thin text-ahTextGrey text-sm flex flex-col">
                  <p>{`${advisor.title} ${advisor.fullName}`}</p>
                  <p>{advisor.specialization}</p>
                  <p className="flex items-center">
                    {`${advisor.yearsOfExperience}yrs • ${advisor.office}`}
                  </p>
                </div>
              </Label>
              <RadioGroupItem
                value={advisor}
                id={advisor.advisorId}
                className="w-6 h-6
                data-checked:border-2 data-checked:border-ahGreen data-checked:bg-white cursor-pointer"
              />
            </div>
            <div className="ms-2 md:ms-20 flex justify-between mt-3">
                {advisor.closestAvailability && <Badge className={cn("text-green-600 bg-green-100 font-semibold p-1")}>
                    {isSameDay(today, startOfDay(advisor.closestAvailability))? `Today • ${format(advisor.closestAvailability, "h:mm a")}`:
                    `${format(advisor.closestAvailability, "iii • h:mm a")}`}
                </Badge>}
                {/* <Badge className={cn(" text-ahTextGrey font-semibold bg-stone-100")}>Office</Badge> */}
            </div>
          </div>
        ))}
      </RadioGroup>}
      {isError && !advisors && <FetchErrorMessage/>}
    </div>
  );
};

export default AdvisorSelectionGroup;
