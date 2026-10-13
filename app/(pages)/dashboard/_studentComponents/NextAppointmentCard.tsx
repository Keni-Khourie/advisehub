import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {Dot} from "lucide-react"
import Image from "next/image";
const NextAppointmentCard = () => {
  return (
    <Card className={cn("w-full md:w-1/2 bg-ahBgBlue border rounded-sm p-4")}>
      <CardHeader className="">
        <CardTitle className="font-semibold">Next Appointment</CardTitle>
      </CardHeader>
      <CardContent className=" flex space-between items-start p-0">
        <div className="flex flex-col gap-y-5  justify-center">
          <div>
             <p className="flex items-center text-xl font-bold text-ahTextBlack"> {"Tue, Mar 15"} <span><Dot/></span> {"10:30 AM"}</p>
          </div>
          <div className="font-thin text-ahTextGrey text-sm flex items-center">
            <p className="font-thin">{"Dr. Sarah Miller"}</p>
            <Dot/>
            <p>{"Academic Planning"}</p>
          </div>
          <Badge className={cn("bg-green-100 px-3 text-green-600 font-semibold py-2")}>Confirmed</Badge>
        </div>
        <div className="w-[40%]">
          <Image src="/nextAppointmentCardImage.png" alt="next appointment card image" width={500} height={500} className=""/>
        </div>
      </CardContent>
    </Card>
  )
}

export default NextAppointmentCard