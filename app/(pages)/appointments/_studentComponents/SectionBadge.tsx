"use client";
import { useContext } from "react";
import { Badge } from "@/components/ui/badge";
import { StudentAppointmentContext } from "./StudentAppointments";
import { StudentAppointmentSection } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  text: StudentAppointmentSection;
}

const SectionBadge = ({ text }: Props) => {
  const contextData = useContext(StudentAppointmentContext);
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

export default SectionBadge;
