"use client"
import {useContext} from 'react'
import { AdvisorAppointmentContext } from './AdvisorAppointments';
import { DummyAdvisorAppointments } from '@/dummyData/dummyTypes';
import {appointmentSections} from "@/constants"
import { getAdvisorPastMeetings, getAdvisorUpcomingMeetings } from '@/dummyData/dummyUtils';
import PageHeader from '@/customUI/PageHeader';
import AdvisorAppointmentSectionBadge from './AdvisorAppointmentSectionBadge';
import AdvisorAppointmentListItem from './AdvisorAppointmentListItem';
import BlueButton from '@/customUI/BlueButton'
import Link from 'next/link';
//import { Skeleton } from '@/components/ui/skeleton';

const AdvisorAppointmentsContent = () => {
  const contextData = useContext(AdvisorAppointmentContext)
  const appointments:DummyAdvisorAppointments[] = contextData.componentDetails.section==="Upcoming"? getAdvisorUpcomingMeetings(): contextData.componentDetails.section==="Past Meetings"? getAdvisorPastMeetings():[]
  const isLoading:boolean = false 
  return (
    <div>
      
      <PageHeader headerText={contextData.componentDetails.header} subtitle={contextData.componentDetails.subtitle} additionalClass="mb-10"/>
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-x-3">
          {appointmentSections.map((section, index)=><AdvisorAppointmentSectionBadge key={index} text={section}/>)}
        </div>
        <Link href="/availability">
        <BlueButton text="Manage Availability" additionalStyle="py-1 text-sm"/>
        </Link>
      </div>
      <div className="flex flex-col gap-y-6 overflow-y-scroll md:h-[65vh]">
        {appointments && (
        appointments.map((meeting, index)=><AdvisorAppointmentListItem type={contextData.componentDetails.section} data={meeting} key={index} isLoading={isLoading}/>)
      )
       
      }
      </div>
      
    </div>
  )
}

export default AdvisorAppointmentsContent