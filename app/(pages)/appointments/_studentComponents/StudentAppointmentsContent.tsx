"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
//import PastMeetings from './PastMeetings';
//import UpcomingAppointments from './UpcomingAppointments';
import PageHeader from '@/customUI/PageHeader';
import {studentAppointmentSections} from "@/constants"
import AppointmentSectionBadge from './AppointmentSectionBadge';
import AppointmentListItem from './AppointmentListItem';
import { ExistingMeetingData } from '@/dummyData/dummyTypes';
import { getPastMeetings, getUpcomingMeetings } from '@/dummyData/dummyUtils';


const StudentAppointmentsContent = () => {
  const contextData = useContext(StudentAppointmentContext)
  const appointments:ExistingMeetingData[] = contextData.componentDetails.section==="Upcoming"? getUpcomingMeetings(): contextData.componentDetails.section==="Past Meetings"? getPastMeetings():[]
  //this will come from the RTK query
  const isLoading:boolean = false 
  return (
    <div>
      <PageHeader headerText={contextData.componentDetails.header} subtitle={contextData.componentDetails.subtitle} additionalClass="mb-10"/>

      <div className="flex gap-x-3 mb-10">
        {studentAppointmentSections.map((section, index)=><AppointmentSectionBadge key={index} text={section}/>)}
      </div>

      <div className="flex flex-col gap-y-6 overflow-y-scroll h-[40vw]">
        {appointments && (
        appointments.map((meeting, index)=><AppointmentListItem type={contextData.componentDetails.section} data={meeting} key={index} isLoading={isLoading}/>)
      )
       
      }
      </div>

      {/* {
        contextData.componentDetails && (
          contextData.componentDetails.view==="UpcomingAppointments"?(<UpcomingAppointments/>):contextData.componentDetails.view==="PastMeetings"?(<PastMeetings/>):<></>
        )
      } */}
    </div>
  )
}

export default StudentAppointmentsContent