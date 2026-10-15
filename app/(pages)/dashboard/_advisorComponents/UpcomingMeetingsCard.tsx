import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
//import { Skeleton } from '@/components/ui/skeleton';
//public/upcomingMeetingsCardImage.png

interface Props{
    upcomingMeetings:number
}
const UpcomingMeetingsCard = ({upcomingMeetings}:Props) => {
  return (
     <Card className={cn("bg-white rounded-lg pt-4 ps-3 py-3 border w-full md:w-1/3")}>
      
      <CardContent className="w-full h-full flex gap-x-5">
        <div className="w-full h-full flex flex-col gap-y-6 z-10">
            <div className="flex items-center gap-x-3">
            <p className="font-semibold text-3xl">{upcomingMeetings}</p>
            <p className="font-thin text-ahTextGrey text-nowrap"> Upcoming meetings</p>
                  </div>
                  <Link href="/appointments">
              <p className="cursor-pointer text-sm text-ahTextPurple hover:underline font-semibold">View Appointments</p>
                  </Link>
        </div>
       
            <Image src="/upcomingMeetingsCardImage.png" alt="upcoming meetings card image" width={500} height={500} className="w-30 mb-[-20] me-[-10]"/>
      </CardContent>
    </Card>
  )
}

export default UpcomingMeetingsCard