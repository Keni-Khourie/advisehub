"use client";
import { useContext } from "react";
import { StudentScheduleAppointmentContext } from "./StudentAppointmentSchedule";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { dummyAdvisors } from "@/dummyData/dummyData";
import { Dot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utilityFunctions";

const AdvisorSelectionGroup = () => {
  //fetch advisors for advisor select (API:getAdvisors with nearest available time)
  const contextData = useContext(StudentScheduleAppointmentContext);
  const updateAdvisorSelection = (e:number) => {
    contextData.setAppointmentDetails({...contextData.appointmentDetails, advisorId:e})
  };

  return (
    <div>
      <RadioGroup
        className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5"
        value={contextData.appointmentDetails.advisorId}
        onValueChange={updateAdvisorSelection}
      >
        {dummyAdvisors.map((advisor, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg shadow-md focus:border-ahGreen active:border-ahGreen checked:border-ahGreen hover:border-ahGreen w-full border"
          >
            <div className="w-full flex justify-between">
              <Label
                htmlFor={`${advisor.id}`}
                className="flex gap-x-3 cursor-pointer"
              >
                <div>
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-white font-semibold bg-ahGreen text-lg">
                      {getInitials(advisor.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="font-thin text-ahTextGrey text-sm flex flex-col">
                  <p>{`${advisor.title} ${advisor.fullName}`}</p>
                  <p>{advisor.jobTitle}</p>
                  <p className="flex items-center">
                    {advisor.yearsOfExperience}yrs
                    <span>
                      <Dot />{" "}
                    </span>
                    {advisor.specialization}
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
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default AdvisorSelectionGroup;
