import {  StudentScheduleAppointmentView,  } from '@/types';
import {studentAppointmentComponentDetails} from '@/constants'
export const getComponentDetailsByView = (view:StudentScheduleAppointmentView)=>{
  const details =  studentAppointmentComponentDetails.find((item)=>item.view===view)
  return details ?? studentAppointmentComponentDetails[0]
}
