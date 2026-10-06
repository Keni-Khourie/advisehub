import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {Dot} from "lucide-react"
const NextAppointmentCard = () => {
  return (
    <Card className={cn("w-full bg-ahGrey rounded-sm py-5")}>
      <CardHeader className="">
        <CardTitle className="font-semibold">Next Appointment</CardTitle>
          <CardDescription className="">
           <p className="flex items-center font-light"> {"Tuesday, 15"} <span><Dot/></span> {"10:30 AM"}</p>
          </CardDescription>
      </CardHeader>
      <CardContent className="">
        <p className="font-bold text-xl">{"Dr. Sarah Miller"}</p>
        <p className="flex items-center text-ahTextGrey font-light">
          {"Degree Planning"}
          <Dot/>
          {"Advising Center Room 210"}
        </p>
        <div className="flex justify-end">
          <Button className="bg-white hover:bg-stone-200 border font-semibold rounded-sm text-black px-8 py-5 cursor-pointer">View Details</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default NextAppointmentCard