"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
import PastMeetings from './PastMeetings';
import UpcomingAppointments from './UpcomingAppointments';
import PageHeader from '@/customUI/PageHeader';
import {studentAppointmentSections} from "@/constants"
import AppointmentSectionBadge from './AppointmentSectionBadge';


const StudentAppointmentsContent = () => {
  const contextData = useContext(StudentAppointmentContext)
  return (
    <div>
      <PageHeader headerText={contextData.componentDetails.header} subtitle={contextData.componentDetails.subtitle} additionalClass="mb-10"/>

      <div className="flex gap-x-3 mb-10">
        {studentAppointmentSections.map((section, index)=><AppointmentSectionBadge key={index} text={section}/>)}
      </div>

      {
        contextData.componentDetails && (
          contextData.componentDetails.view==="UpcomingAppointments"?(<UpcomingAppointments/>):contextData.componentDetails.view==="PastMeetings"?(<PastMeetings/>):<></>
        )
      }
    </div>
  )
}

export default StudentAppointmentsContent