import GreenButton from "@/customUI/GreenButton";
import Link from "next/link";


const ScheduleAppointmentButton = () => {
  return (
    <Link href={"/appointments/schedule-appointment"}>
    <GreenButton text="Schedule an Appointment" additionalStyle="w-full"/></Link>
    
  )
}

export default ScheduleAppointmentButton