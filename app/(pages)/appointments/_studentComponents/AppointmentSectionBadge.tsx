"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AppointmentSection } from "@/types/types";
import { getStudentAppointmentComponentDetailsBySection } from '@/lib/utilityFunctions';

interface Props {
  text: AppointmentSection;
}


const AppointmentSectionBadge = ({ text }: Props) => {
      const contextData = useContext(StudentAppointmentContext)
const isActive = contextData.componentDetails.section === text;
const viewData = getStudentAppointmentComponentDetailsBySection(text)
  return (
    <>
      
        <Badge
          className={cn(
            "px-3 bg-ahGrey text-ahTextGrey font-semibold text-center w-28 rounded-sm py-3.5 cursor-pointer",
            isActive && "text-ahGreen",
          )} onClick={()=>contextData.setComponentDetails(viewData)}
        >{text}</Badge>
      
    </>
  )
}

export default AppointmentSectionBadge