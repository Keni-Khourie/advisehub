"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";

import { StudentScheduleAppointmentView, StudentAppointmentSection, StudentAppointmentComponentDetail  } from "@/types";
import StudentAppointmentContent from "./StudentAppointmentContent";


interface AppointmentDetails{
  appointmentReason:string|undefined;
  advisorId: number|undefined;
  date: Date|undefined;
}
interface StudentAppointmentContextData{
  componentDetails: StudentAppointmentComponentDetail,
  setComponentDetails:Dispatch<SetStateAction<StudentAppointmentComponentDetail>>;
  // view:StudentAppointmentView;
  // setView:Dispatch<SetStateAction<StudentAppointmentView>>;
  // section:StudentAppointmentSection,
  // setSection:Dispatch<SetStateAction<StudentAppointmentSection>>;
  appointmentDetails:AppointmentDetails;
  setAppointmentDetails:Dispatch<SetStateAction<AppointmentDetails>>;

}
export const StudentAppointmentContext = createContext<StudentAppointmentContextData>({
  componentDetails:{
    view:"StudentScheduleAppointmentLanding",
    section:"Details",
    header:"Schedule an Appointment",
    subtitle:"Begin the guided booking",
        
  },
  setComponentDetails:()=>{},
  // view:"StudentScheduleAppointmentLanding",
  // setView:()=>{},
  // section:"Details",
  // setSection:()=>{},
  appointmentDetails:{
    appointmentReason:undefined,
    advisorId:undefined,
    date:undefined
  },
  setAppointmentDetails:()=>{},
})
const StudentAppointmentSchedule = () => {
    const [view, setView]= useState<StudentScheduleAppointmentView>("DateSelection")
    const [section, setSection] = useState<StudentAppointmentSection>("Details")
    const [componentDetails, setComponentDetails] = useState<StudentAppointmentComponentDetail>({
      view:"StudentScheduleAppointmentLanding",
        section:"Details",
       header:"Schedule an Appointment",
        subtitle:"Begin the guided booking",

    })
    const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
      appointmentReason:undefined,
    advisorId:undefined,
    date:undefined
    })
  return (
    <StudentAppointmentContext.Provider value={{componentDetails, setComponentDetails, appointmentDetails, setAppointmentDetails}}>
      <StudentAppointmentContent/>
    </StudentAppointmentContext.Provider>
    
  )
}

export default StudentAppointmentSchedule

//#20B8B4