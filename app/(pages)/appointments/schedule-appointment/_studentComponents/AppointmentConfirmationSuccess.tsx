"use client"
import {useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import Image from 'next/image';
import {format} from "date-fns"
import WhiteButton from '@/customUI/WhiteButton';
import BlueButton from '@/customUI/BlueButton';
import Link from "next/link"
const AppointmentConfirmationSuccess = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    console.log(contextData);
  return (
    <div className="w-full flex justify-center">
      <div>
        <div className="mb-4">
          <Image src="/appointmentConfirmedImage.png" alt="appointment confirmed image" width={500} height={500} className=""/>
        </div>
        <div>
          <p className="font-bold text-4xl text-center mb-3">Appointment Confirmed!</p>
          <p className="font-thin text-center text-ahTextGrey">{`${format(contextData.appointmentDetails.date!, "iii, MMM d")} • ${contextData.appointmentDetails.availableTime} with ${contextData.appointmentDetails.advisor?.title} ${contextData.appointmentDetails.advisor?.fullName}`}</p>
        </div>
        <div className="bg-ahCardBlue rounded-lg px-4 py-5 flex flex-col gap-y-2 items-start shadow-sm mb-6">
          <p className="font-semibold">Academic Planning</p>
          <p className="font-thin text-sm text-center text-ahTextGrey">{"Advising Center • Online option available"}</p>
        </div>

        <div className="flex justify-center items-center gap-x-3 flex-wrap md:flex-nowrap">
          <Link href="/appointments"><BlueButton text="View My Appointments" additionalStyle="py-5"/></Link>
          <Link href="/dashboard"><WhiteButton text="Back to dashboard" additionalStyle="text-sm shadow-sm h-8"/></Link>
        </div>

      </div>
    </div>
  )
}

export default AppointmentConfirmationSuccess