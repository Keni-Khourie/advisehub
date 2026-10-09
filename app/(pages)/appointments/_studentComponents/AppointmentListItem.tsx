import { Button } from "@/components/ui/button";
import { ExistingMeetingData } from "@/dummyData/dummyTypes";
import { StudentAppointmentSection } from "@/types";
import {format} from "date-fns"
import { Dot } from "lucide-react";
import Link from "next/link";


interface Props{
  type:StudentAppointmentSection,
  data:ExistingMeetingData
}

const AppointmentListItem = ({type, data}:Props) => {
  return (
    <div className="flex justify-between ps-3 pe-5 y-2 rounded-sm border">
      <div className="flex gap-x-5">
        <div className="font-bold bg-ahGrey text-center px-2">{format(data.startDateTime, "dd MMM").toLocaleUpperCase()}</div>
        <div>
          <p>{data.meetingReason}</p>
          {type==="Upcoming" &&
          (<p className="font-thin text-ahTextGrey">
            {data.advisor}
            <Dot/>
            {`${format(data.startDateTime,"h a..aa")} - ${format(data.endDateTime,"h a..aa")}`}
          </p>)}
          {type==="Past Meetings" &&(
            <div className="flex flex-col font-thin text-ahTextGrey">
              <p>{data.advisor}</p>
              <p>{data.meetingReason}</p>
            </div>
          )}
        </div>
      </div>
      <Link href="#">
      <Button>View Details</Button></Link>
      
    </div>
  )
}

export default AppointmentListItem