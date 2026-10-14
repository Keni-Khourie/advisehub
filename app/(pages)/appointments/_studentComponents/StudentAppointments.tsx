"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";
import { StudentAppointmentView, StudentAppointmentSection, StudentAppointmentComponentDetail  } from "@/types";
import StudentAppointmentsContent from "./StudentAppointmentsContent";


interface StudentAppointmentContextData{
  componentDetails:StudentAppointmentComponentDetail;
  setComponentDetails:Dispatch<SetStateAction<StudentAppointmentComponentDetail>>;
}

export const StudentAppointmentContext = createContext<StudentAppointmentContextData>({
  componentDetails:{
    view:"UpcomingAppointments",
    section:"Upcoming",
    header:"My Appointments",
    subtitle:"View upcoming sessions and previous meetings",
        
  },
  setComponentDetails:()=>{},
})

const StudentAppointments = () => {
  const [componentDetails, setComponentDetails] = useState<StudentAppointmentComponentDetail>({
      view:"UpcomingAppointments",
        section:"Upcoming",
       header:"My Appointments",
       subtitle:"View upcoming sessions and previous meetings",

    })
  return (
   <StudentAppointmentContext.Provider value={{componentDetails, setComponentDetails}}>
    <StudentAppointmentsContent/>
   </StudentAppointmentContext.Provider>
  )
}

export default StudentAppointments