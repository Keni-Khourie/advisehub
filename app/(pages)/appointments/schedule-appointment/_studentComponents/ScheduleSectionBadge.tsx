"use client";
import { useContext } from "react";
import { Badge } from "@/components/ui/badge";
import { StudentScheduleAppointmentContext } from "./StudentAppointmentSchedule";
import { StudentScheduleAppointmentSection } from "@/types/types";
import { cn } from "@/lib/utils";

interface Props {
  text: StudentScheduleAppointmentSection;
}

const ScheduleSectionBadge = ({ text }: Props) => {
  const contextData = useContext(StudentScheduleAppointmentContext);
  const isActive = contextData.componentDetails.section === text;

  return (
    <>
      {text !== "none" && (
        <Badge
          className={cn(
            "px-3 bg-ahGrey text-ahTextGrey font-semibold text-center w-28 rounded-sm py-3.5 ",
            isActive && "text-ahGreen",
          )}
        >{`${text === "Details" ? "1" : text === "Time" ? "2" : text === "Review" ? "3" : ""} ${text}`}</Badge>
      )}
    </>
  );
};

export default ScheduleSectionBadge;
