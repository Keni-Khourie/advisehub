"use client";
import { useContext } from "react";
import { StudentScheduleAppointmentContext } from "./StudentAppointmentSchedule";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { appointmentReasons } from "@/constants";
import { AdvisorSpecialization } from "@/types";
const ReasonSelectionGroup = () => {
  const contextData = useContext(StudentScheduleAppointmentContext);

  const updateAppointmentReason = (e: string) => {
    if(e !=="General Advising"){
        contextData.setAppointmentDetails({
            ...contextData.appointmentDetails, generalAdvisingQuestion:undefined
        })
    }
    contextData.setAppointmentDetails({
      ...contextData.appointmentDetails,
      appointmentReason: e as AdvisorSpecialization,
    });
  };
  return (
    <div className="w-full md:w-2/3">
        <RadioGroup
          onValueChange={(e) => updateAppointmentReason(e)}
          className="w-full"
          value={contextData.appointmentDetails.appointmentReason??""}
        >
          {appointmentReasons.map((reason, index) => (
            <div
              className="flex items-center gap-3 bg-white  rounded-lg py-3 px-3 border active:border-ahGreen"
              key={index}
            >
              <RadioGroupItem
                value={reason.option}
                id={reason.option}
                className="w-6 h-6
                data-checked:border-2 data-checked:border-ahGreen data-checked:bg-white"
              />
              <div>
                <Label
                  htmlFor={reason.option}
                  className="flex flex-col justify-center items-start gap-y-0"
                >
                  <p className="text-ahTextBlack font-semibold text-base">
                    {reason.option}
                  </p>
                  <p className="text-ahTextGrey text-sm">{reason.description}</p>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
    </div>
  );
};

export default ReasonSelectionGroup;
