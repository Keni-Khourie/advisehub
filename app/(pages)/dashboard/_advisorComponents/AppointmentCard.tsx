import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {format} from "date-fns"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";


const AppointmentCard = () => {
  return (
    <Card className={cn("bg-white rounded-lg pt-4 px-3 py-3 border")}>
      <CardHeader className="">
        <CardTitle className=""></CardTitle>
        <CardDescription className=""></CardDescription>
      </CardHeader>
      <CardContent className=""></CardContent>
    </Card>
  )
}

export default AppointmentCard