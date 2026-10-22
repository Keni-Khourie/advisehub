import {  AppointmentSection, AppointmentView, StudentScheduleAppointmentView, StudentScheduleAppointmentStep  } from '@/types/types';
import {studentScheduleAppointmentComponentDetails, studentAppointmentComponentDetails, studentScheduleAppointmentSteps, advisorAppointmentComponentDetails} from '@/constants'
export const getStudentAppointmentScheduleComponentDetailsByView = (view:StudentScheduleAppointmentView)=>{
  const details =  studentScheduleAppointmentComponentDetails.find((item)=>item.view===view)
  return details ?? studentScheduleAppointmentComponentDetails[0]
}

export const getStudentAppointmentComponentDetailsByView = (view:AppointmentView)=>{
  const details =  studentAppointmentComponentDetails.find((item)=>item.view===view)
  return details ?? studentAppointmentComponentDetails[0]
}

export const getStudentAppointmentComponentDetailsBySection = (section:AppointmentSection)=>{
  const details =  studentAppointmentComponentDetails.find((item)=>item.section===section)
  return details ?? studentAppointmentComponentDetails[0]
}
export const getAdvisorAppointmentComponentDetailsBySection = (section:AppointmentSection)=>{
  const details =  advisorAppointmentComponentDetails.find((item)=>item.section===section)
  return details ?? advisorAppointmentComponentDetails[0]
}

export const getStudentScheduleStepCompletion = (stepNumber:number, currentStep:StudentScheduleAppointmentStep)=>{
  const contextIndex = studentScheduleAppointmentSteps.findIndex((step)=> step===currentStep)
  const currentIndex= stepNumber - 1
  const isComplete:boolean = contextIndex > currentIndex

  //const isComplete:boolean = studentScheduleAppointmentSteps[stepNumber]===currentStep
  return isComplete
}

export const getInitials = (fullName:string)=>{
const initials = fullName.split(" ").map((names)=>names[0]).join("")
return initials

}

export const truncateText = (text:string, characterLimit:number)=> {
  return text.length > characterLimit ? text.slice(0, characterLimit) + "..." : text;
}

export const generateArray = (length:number)=>{
  return Array.from({length}, (_, index)=>index)
}
