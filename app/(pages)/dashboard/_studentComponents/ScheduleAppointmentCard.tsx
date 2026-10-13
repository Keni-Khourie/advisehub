import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import BlueButton from "@/customUI/BlueButton";

const ScheduleAppointmentCard = () => {
  return (
    <Card className={cn("w-full md:w-1/2 p-4")}>
      <CardHeader className="">
        <CardTitle className="font-semibold text-lg">Schedule an Appointment</CardTitle>
        <CardDescription className="">
          Find an advisor and book an available time
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <Badge className="bg-green-100 text-green-600 font-semibold px-4 py-2">{`Next Available ${"today"}`}</Badge>
        <div className="flex flex-col w-[40%]">
          <Image
            src="/scheduleAppointmentCardImage.png"
            alt="schedule appointment card image"
            width={500}
            height={500}
            className="mb-[-3]"
          />
          <Link href={"/appointments/schedule-appointment"}>
            <BlueButton
              text="Schedule now"
              additionalStyle="w-full py-3"
            />
            
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleAppointmentCard;
