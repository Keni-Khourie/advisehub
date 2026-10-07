"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";

import { StudentAppointmentView, StudentAppointmentSection } from "@/types";
import StudentAppointmentContent from "./StudentAppointmentContent";

interface AppointmentDetails{
  appointmentReason:string|undefined;
  advisorId: number|undefined;
  date: Date|undefined;
}
interface StudentAppointmentContextData{
  view:StudentAppointmentView;
  setView:Dispatch<SetStateAction<StudentAppointmentView>>;
  section:StudentAppointmentSection,
  setSection:Dispatch<SetStateAction<StudentAppointmentSection>>;
  appointmentDetails:AppointmentDetails;
  setAppointmentDetails:Dispatch<SetStateAction<AppointmentDetails>>;

}
export const StudentAppointmentContext = createContext<StudentAppointmentContextData>({
  view:"StudentAppointmentLanding",
  setView:()=>{},
  section:"Details",
  setSection:()=>{},
  appointmentDetails:{
    appointmentReason:undefined,
    advisorId:undefined,
    date:undefined
  },
  setAppointmentDetails:()=>{},
})
const StudentAppointments = () => {
    const [view, setView]= useState<StudentAppointmentView>("StudentAppointmentLanding")
    const [section, setSection] = useState<StudentAppointmentSection>("Details")
    const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
      appointmentReason:undefined,
    advisorId:undefined,
    date:undefined
    })
  return (
    <StudentAppointmentContext.Provider value={{view, setView,section, setSection, appointmentDetails, setAppointmentDetails}}>
      <StudentAppointmentContent/>
    </StudentAppointmentContext.Provider>
    
  )
}

export default StudentAppointments

//#20B8B4