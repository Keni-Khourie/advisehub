"use client"
import SectionHeader from '@/customUI/SectionHeader';
import AppointmentCard from './AppointmentCard';
//import { Skeleton } from '@/components/ui/skeleton';

const TodaysAppointments = () => {
  return (
    <div>
        <SectionHeader headerText="Today's Appointments"/>
        <div className="w-full flex flex-col gap-y-6">
            <AppointmentCard/>
            <AppointmentCard/>
            <AppointmentCard/>
        </div>
    </div>
  )
}

export default TodaysAppointments