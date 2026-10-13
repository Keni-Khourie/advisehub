"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const AppointmentTimePlaceCard = () => {
  return (
     <Card className={cn("bg-ahGrey rounded-sm w-1/3 border pb-22")}>
      <CardHeader className="">
        <CardTitle className="font-semibold">Appointment</CardTitle>
        <CardDescription className="">
            <p className="flex items-center">{`${"Today"}•${"10:30 AM"}`}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center">
        <p className="font-semibold">Advising Center</p>
        <p className="text-ahTextGrey">{"Room 210"}</p>
      </CardContent>
    </Card>
  )
}

export default AppointmentTimePlaceCard