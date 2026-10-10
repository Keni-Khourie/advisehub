"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";

import { StudentScheduleAppointmentView, StudentScheduleAppointmentSection, StudentScheduleAppointmentComponentDetail  } from "@/types";
import StudentScheduleAppointmentContent from "./StudentScheduleAppointmentContent";
import{getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
//this would be the data sent to the backend
interface AppointmentDetails{
  appointmentReason:string|undefined;
  advisorId: number|undefined;
  date: Date|undefined;
}
interface StudentScheduleAppointmentContextData{
  componentDetails: StudentScheduleAppointmentComponentDetail,
  setComponentDetails:Dispatch<SetStateAction<StudentScheduleAppointmentComponentDetail>>;
  // view:StudentAppointmentView;
  // setView:Dispatch<SetStateAction<StudentAppointmentView>>;
  // section:StudentAppointmentSection,
  // setSection:Dispatch<SetStateAction<StudentAppointmentSection>>;
  appointmentDetails:AppointmentDetails;
  setAppointmentDetails:Dispatch<SetStateAction<AppointmentDetails>>;

}

const studentScheduleAppointmentLanding = getStudentAppointmentScheduleComponentDetailsByView("StudentScheduleAppointmentLanding")

export const StudentScheduleAppointmentContext = createContext<StudentScheduleAppointmentContextData>({
  componentDetails:studentScheduleAppointmentLanding,
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
    //const [view, setView]= useState<StudentScheduleAppointmentView>("DateSelection")
   // const [section, setSection] = useState<StudentScheduleAppointmentSection>("Details")
    const [componentDetails, setComponentDetails] = useState<StudentScheduleAppointmentComponentDetail>(studentScheduleAppointmentLanding)
    const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
      appointmentReason:undefined,
    advisorId:undefined,
    date:undefined
    })
  return (
    <StudentScheduleAppointmentContext.Provider value={{componentDetails, setComponentDetails, appointmentDetails, setAppointmentDetails}}>
      <StudentScheduleAppointmentContent/>
    </StudentScheduleAppointmentContext.Provider>
    
  )
}

export default StudentAppointmentSchedule

//#20B8B4