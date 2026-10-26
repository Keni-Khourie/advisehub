"use client"
import { createContext, useState, Dispatch, SetStateAction } from "react";
import {AdvisorSpecialization, StudentScheduleAppointmentComponentDetail  } from "@/types/types";
import StudentScheduleAppointmentContent from "./StudentScheduleAppointmentContent";
import{getStudentAppointmentScheduleComponentDetailsByView } from '@/lib/utilityFunctions';
import {AdvisorResponseForStudent} from "@/redux/features/main/advisorApiSlice"
import { AdvisorAvailabilityStudentListData } from "@/redux/features/main/availabilityApiSlice";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";
import {useRouter} from "next/navigation"
//this would be the data sent to the backend
interface AppointmentDetails{
  appointmentReason:AdvisorSpecialization|undefined;
  advisorId: string|undefined;
  date: Date|undefined;
  availableTime:string|undefined;
  generalAdvisingQuestion:string|undefined;
  advisor:AdvisorResponseForStudent|undefined;
  meetingDateTime:string|undefined;
  availabilityId:number|undefined
  availability:AdvisorAvailabilityStudentListData|undefined
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
    date:new Date(),
    availableTime:undefined,
    generalAdvisingQuestion:undefined,
    advisor:undefined,
    meetingDateTime:undefined,
    availabilityId:undefined,
    availability:undefined,
  },
  setAppointmentDetails:()=>{},
})
const StudentAppointmentSchedule = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const router = useRouter()
  if(user.role==="ADVISOR"){router.push("/dashboard")}
    const [componentDetails, setComponentDetails] = useState<StudentScheduleAppointmentComponentDetail>(studentScheduleAppointmentLanding)
    const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails>({
      appointmentReason:undefined,
    advisorId:undefined,
    date: new Date(),
    availableTime:undefined,
    generalAdvisingQuestion:undefined,
    advisor:undefined,
    meetingDateTime:undefined,
    availabilityId:undefined,
    availability:undefined,
    })

  return (
    <StudentScheduleAppointmentContext.Provider value={{componentDetails, setComponentDetails, appointmentDetails, setAppointmentDetails}}>
      <StudentScheduleAppointmentContent/>
    </StudentScheduleAppointmentContext.Provider>
    
  )
}

export default StudentAppointmentSchedule

//#20B8B4

