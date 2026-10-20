"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";
import {AppointmentComponentDetail  } from "@/types/types";
import AdvisorAppointmentsContent from "./AdvisorAppointmentsContent";
interface AdvisorAppointmentContextData{
  componentDetails:AppointmentComponentDetail;
  setComponentDetails:Dispatch<SetStateAction<AppointmentComponentDetail>>;
}

export const AdvisorAppointmentContext = createContext<AdvisorAppointmentContextData>({
  componentDetails:{
    view:"UpcomingAppointments",
    section:"Upcoming",
    header:"Appointments",
    subtitle:"Upcoming and past advising meetings.",
        
  },
  setComponentDetails:()=>{},
})
const AdvisorAppointments = () => {
  const [componentDetails, setComponentDetails] = useState<AppointmentComponentDetail>({
      view:"UpcomingAppointments",
        section:"Upcoming",
       header:"Appointments",
       subtitle:"Upcoming and past advising meetings.",

    })
  return (
    <AdvisorAppointmentContext.Provider value={{componentDetails, setComponentDetails}}>
    <AdvisorAppointmentsContent/>
   </AdvisorAppointmentContext.Provider>
  )
}

export default AdvisorAppointments