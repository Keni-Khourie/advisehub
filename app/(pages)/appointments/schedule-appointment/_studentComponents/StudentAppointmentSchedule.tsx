"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";
import {AdvisorSpecialization, StudentScheduleAppointmentComponentDetail  } from "@/types";
import StudentScheduleAppointmentContent from "./StudentScheduleAppointmentContent";
import{getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import {DummyAdvisor} from "@/dummyData/dummyTypes"
//this would be the data sent to the backend
interface AppointmentDetails{
  appointmentReason:AdvisorSpecialization|undefined;
  advisorId: number|undefined;
  date: Date|undefined;
  availableTime:string|undefined;
  generalAdvisingQuestion:string|undefined;
  advisor:DummyAdvisor|undefined
}
interface StudentScheduleAppointmentContextData{
  componentDetails: StudentScheduleAppointmentComponentDetail,
  setComponentDetails:Dispatch<SetStateAction<StudentScheduleAppointmentComponentDetail>>;
  appointmentDetails:AppointmentDetails;
  setAppointmentDetails:Dispatch<SetStateAction<AppointmentDetails>>;

}

const studentScheduleAppointmentLanding = getStudentAppointmentScheduleComponentDetailsByView("StudentScheduleAppointmentLanding")

export const StudentScheduleAppointmentContext = createContext<StudentScheduleAppointmentContextData>({
  componentDetails:studentScheduleAppointmentLanding,
  setComponentDetails:()=>{},
  appointmentDetails:{
    appointmentReason:undefined,
    advisorId:undefined,
    date:undefined,
    availableTime:undefined,
    generalAdvisingQuestion:undefined,
    advisor:undefined
  },
  setAppointmentDetails:()=>{},
})
const StudentAppointmentSchedule = () => {
    const [componentDetails, setComponentDetails] = useState<StudentScheduleAppointmentComponentDetail>(studentScheduleAppointmentLanding)
    const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
      appointmentReason:undefined,
    advisorId:undefined,
    date:undefined,
    availableTime:undefined,
    generalAdvisingQuestion:undefined,
    advisor:undefined
    })
  return (
    <StudentScheduleAppointmentContext.Provider value={{componentDetails, setComponentDetails, appointmentDetails, setAppointmentDetails}}>
      <StudentScheduleAppointmentContent/>
    </StudentScheduleAppointmentContext.Provider>
    
  )
}

export default StudentAppointmentSchedule

//#20B8B4