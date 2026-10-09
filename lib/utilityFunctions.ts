import {  StudentAppointmentSection, StudentAppointmentView, StudentScheduleAppointmentView,  } from '@/types';
import {studentScheduleAppointmentComponentDetails, studentAppointmentComponentDetails} from '@/constants'
export const getStudentAppointmentScheduleComponentDetailsByView = (view:StudentScheduleAppointmentView)=>{
  const details =  studentScheduleAppointmentComponentDetails.find((item)=>item.view===view)
  return details ?? studentScheduleAppointmentComponentDetails[0]
}

export const getStudentAppointmentComponentDetailsByView = (view:StudentAppointmentView)=>{
  const details =  studentAppointmentComponentDetails.find((item)=>item.view===view)
  return details ?? studentAppointmentComponentDetails[0]
}

export const getStudentAppointmentComponentDetailsBySection = (section:StudentAppointmentSection)=>{
  const details =  studentAppointmentComponentDetails.find((item)=>item.section===section)
  return details ?? studentAppointmentComponentDetails[0]
}
