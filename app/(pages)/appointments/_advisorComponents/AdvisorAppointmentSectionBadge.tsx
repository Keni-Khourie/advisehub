"use client"
import {useContext} from 'react'
import { AdvisorAppointmentContext } from './AdvisorAppointments';
import { AppointmentSection } from "@/types/types";
import { getAdvisorAppointmentComponentDetailsBySection } from '@/lib/utilityFunctions'
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
interface Props {
  text: AppointmentSection;
}
const AdvisorAppointmentSectionBadge = ({ text }: Props) => {
   const contextData = useContext(AdvisorAppointmentContext)
   const isActive = contextData.componentDetails.section === text;
const viewData = getAdvisorAppointmentComponentDetailsBySection(text)
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

export default AdvisorAppointmentSectionBadge