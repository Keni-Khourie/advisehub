"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import {format} from "date-fns"
import { getDummyAdvisorById } from '@/dummyData/dummyUtils';

const AppointmentReviewCard = () => {
     const contextData = useContext(StudentScheduleAppointmentContext)
    //fetch advisor by id based on advisor ID in context
    const selectedAdvisor = getDummyAdvisorById(contextData.appointmentDetails.advisorId!)
  return (
     <div className="bg-white border w-full md:w-2/3 rounded-lg px-3 pt-8 pb-12 flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-ahTextGrey font-semibold">Date & Time</p>
          {contextData.appointmentDetails.date && <p className="font-semi-bold text-base">{`${format(contextData.appointmentDetails.date, "iii MMM, d")} • ${contextData.appointmentDetails.availableTime}`}</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-ahTextGrey font-semibold">Advisor</p>
          {selectedAdvisor && contextData.appointmentDetails.appointmentReason && <p className="font-semi-bold text-base">{`${selectedAdvisor.title} ${selectedAdvisor.fullName} • ${contextData.appointmentDetails.appointmentReason}`}</p>}
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-ahTextGrey font-semibold">Reason</p>
          <p className="font-semi-bold text-base">{`${contextData.appointmentDetails.appointmentReason}`}</p>
        </div>
        </div>
  )
}

export default AppointmentReviewCard