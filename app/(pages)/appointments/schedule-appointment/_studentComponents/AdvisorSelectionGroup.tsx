"use client";
import { useContext } from "react";
import { StudentScheduleAppointmentContext } from "./StudentAppointmentSchedule";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { dummyAdvisors } from "@/dummyData/dummyData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CardAvatar from "@/customUI/CardAvatar";
//import { Skeleton } from '@/components/ui/skeleton';
const AdvisorSelectionGroup = () => {
  //fetch advisors for advisor select (API:getAdvisors with nearest available time)
  //add skeletons for loading
  const contextData = useContext(StudentScheduleAppointmentContext);
  const updateAdvisorSelection = (e:number) => {
    contextData.setAppointmentDetails({...contextData.appointmentDetails, advisorId:e})
  };

  return (
    <div>
      <RadioGroup
        className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5"
        value={contextData.appointmentDetails.advisorId??""}
        onValueChange={updateAdvisorSelection}
      >
        {dummyAdvisors.map((advisor, index) => (
          <div
            key={index}
            className={cn("bg-white p-3 rounded-lg shadow-md focus:border-ahGreen active:border-ahGreen checked:border-ahGreen hover:border-ahGreen w-full border",contextData.appointmentDetails.advisorId===advisor.id &&"border-2 border-ahGreen")}
          >
            <div className="w-full flex justify-between">
              <Label
                htmlFor={`${advisor.id}`}
                className="flex gap-x-3 cursor-pointer"
              >
                <div>
                  <CardAvatar fullName={advisor.fullName}/>
                  
                </div>
                <div className="font-thin text-ahTextGrey text-sm flex flex-col">
                  <p>{`${advisor.title} ${advisor.fullName}`}</p>
                  <p>{advisor.jobTitle}</p>
                  <p className="flex items-center">
                    {`${advisor.yearsOfExperience}yrs • ${advisor.specialization}`}
                  </p>
                </div>
              </Label>
              <RadioGroupItem
                value={advisor.id}
                id={`${advisor.id}`}
                className="w-6 h-6
                data-checked:border-2 data-checked:border-ahGreen data-checked:bg-white cursor-pointer"
              />
            </div>
            <div className="ms-2 md:ms-20 flex justify-between mt-3">
                <Badge className={cn("text-green-600 bg-green-100 font-semibold p-1")}>
                    {"Today 4:00PM"}
                </Badge>
                <Badge className={cn(" text-ahTextGrey font-semibold bg-stone-100")}>Office</Badge>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default AdvisorSelectionGroup;
