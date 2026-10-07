"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";

import { StudentAppointmentView } from "@/types";
import StudentAppointmentContent from "./StudentAppointmentContent";

interface AppointmentDetails{
  appointmentReason:string|undefined;
  advisorId: number|undefined;
  date: Date|undefined;
}
interface StudentAppointmentContextData{
  view:StudentAppointmentView;
  setView:Dispatch<SetStateAction<StudentAppointmentView>>;
  appointmentDetails:AppointmentDetails;
  setAppointmentDetails:Dispatch<SetStateAction<AppointmentDetails>>;

}
export const StudentAppointmentContext = createContext<StudentAppointmentContextData>({
  view:"StudentAppointmentLanding",
  setView:()=>{},
  appointmentDetails:{
    appointmentReason:undefined,
    advisorId:undefined,
    date:undefined
  },
  setAppointmentDetails:()=>{},
})
const StudentAppointments = () => {
    const [view, setView]= useState<StudentAppointmentView>("StudentAppointmentLanding")
    const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
      appointmentReason:undefined,
    advisorId:undefined,
    date:undefined
    })
  return (
    <StudentAppointmentContext.Provider value={{view, setView,appointmentDetails, setAppointmentDetails}}>
      <StudentAppointmentContent/>
    </StudentAppointmentContext.Provider>
    
  )
}

export default StudentAppointments

//#20B8B4