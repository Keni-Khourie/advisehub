import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const NextAppointmentCard = () => {
  return (
    <Card className={cn("w-full md:w-1/2 rounded-lg bg-white px-3 pt-3 pb-8")}>
      <CardHeader className="">
        <CardTitle className="font-semibold text-base">Next Appointment</CardTitle>
      </CardHeader>
      <CardContent className="">
        <p className="font-bold text-xl">{`Mar 12 • 10:30 AM`}</p>
        <p className="font-thin text-sm text-ahTextGrey">{`Graduation Review`}</p>
      </CardContent>
      
    </Card>
  )
}

export default NextAppointmentCard