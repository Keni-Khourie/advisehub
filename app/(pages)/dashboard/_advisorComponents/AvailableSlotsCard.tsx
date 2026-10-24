import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from '@/components/ui/skeleton';

interface Props{
    slots:number|undefined
    isLoading:boolean
    isError:boolean
}
 
const AvailableSlotsCard = ({slots, isLoading, isError}:Props) => {
  return (
     <Card className={cn("bg-ahCardBlue rounded-lg pt-4 px-3 py-3 w-full md:w-1/3")}>
      <CardContent className="w-full h-full flex gap-x-5">
         <div className="w-full h-full flex flex-col gap-y-6 z-10">
            <div className="flex items-center gap-x-3">
              {isLoading && <Skeleton className="h-5 w-5 rounded-full"/>}
              {isError &&<p className="font-semibold text-3xl text-ahGreen">-</p>}
            {slots &&<p className="font-semibold text-3xl text-ahGreen">{slots?slots:0}</p>}
            
            <p className="font-thin text-ahTextGrey text-nowrap"> Upcoming meetings</p>
                  </div>
                  <Link href="/availability">
              <p className="cursor-pointer text-sm text-ahTextPurple hover:underline font-semibold">Manage Availability</p>
                  </Link>
        </div>
        <Image src="/availableSlotsCardImage.png" alt="availableSlotsCardImage.png" width={500} height={500} className="w-30 mb-[-20] me-[-10]"/>
      </CardContent>
    </Card>
  )
}

export default AvailableSlotsCard