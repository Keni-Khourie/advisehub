import {  StudentAppointmentSection, StudentAppointmentView, StudentScheduleAppointmentView, StudentScheduleAppointmentStep  } from '@/types';
import {studentScheduleAppointmentComponentDetails, studentAppointmentComponentDetails, studentScheduleAppointmentSteps} from '@/constants'
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

