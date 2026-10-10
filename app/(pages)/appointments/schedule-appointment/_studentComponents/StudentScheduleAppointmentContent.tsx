"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import { StudentScheduleAppointmentSection, StudentScheduleAppointmentView,  } from '@/types';
import {  studentScheduleAppointmentSections, studentScheduleAppointmentComponentDetails } from '@/constants';
import PageHeader from '@/customUI/PageHeader';
import StudentAppointmentScheduleLanding from "./StudentAppointmentScheduleLanding"
import AdvisorSelection from "./AdvisorSelection"
import AppointmentConfirmationLoading from "./AppointmentConfirmationLoading"
import AppointmentConfirmationSuccess from "./AppointmentConfirmationSuccess"
import AppointmentReview from "./AppointmentReview"
import DateSelection from "./DateSelection"
import DateSelectionConflict from "./DateSelectionConflict"
import FindingAppointment from "./FindingAppointment"
import CreatingAppointment from "./CreatingAppointment"
import ScheduleSectionBadge from "./ScheduleSectionBadge"
import ReasonSelection from './ReasonSelection';


const StudentScheduleAppointmentContent = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    
    //const componentDetails = getComponentDetailsByView(contextData.componentDetails.view)
  return (
    <div>
       
        
          <PageHeader headerText={contextData.componentDetails.header} subtitle={contextData.componentDetails.subtitle} additionalClass="mb-10"/>

          <div className="flex gap-x-3 mb-10">
            {studentScheduleAppointmentSections.map((section, index)=><ScheduleSectionBadge key={index} text={section}/>)}
          </div>

        {
            contextData.componentDetails &&
            (
                contextData.componentDetails.view==="StudentScheduleAppointmentLanding"?<StudentAppointmentScheduleLanding/>:
                contextData.componentDetails.view==="DateSelection"?<DateSelection/>:
                contextData.componentDetails.view==="AdvisorSelection"?<AdvisorSelection/>:
                contextData.componentDetails.view==="ReasonSelection"? <ReasonSelection/>:
                contextData.componentDetails.view==="AppointmentReview"?<AppointmentReview/>:
                contextData.componentDetails.view==="AppointmentConfirmationSuccess"?<AppointmentConfirmationSuccess/>:
                contextData.componentDetails.view==="DateSelectionConflict"?<DateSelectionConflict/>:
                //the ones below will most likely be removed
                contextData.componentDetails.view==="AppointmentConfirmationLoading"?<AppointmentConfirmationLoading/>:
                contextData.componentDetails.view==="CreatingAppointment"?<CreatingAppointment/>:
                contextData.componentDetails.view==="FindingAppointment"?<FindingAppointment/>:
                <></>
                
            )
        }
     
    </div>
  ) 
}

export default StudentScheduleAppointmentContent



/*
Note to self:
set view and section badge via context
for the context, set the advisor to an Advisor object. This way in the review section, you can show the advisor's name and office. Also final form, you populate it with the advisor's Id and include the optional note which would be a string.
 */