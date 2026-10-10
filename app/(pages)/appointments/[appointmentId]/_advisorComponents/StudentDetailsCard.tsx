"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";


const StudentDetailsCard = () => {
    const student = {
        firstName:"Alex",
        lastName:"Johnson",
        studentNo:23019047
    }
  return (
     <Card className={cn("border rounded-sm bg-white w-2/3 pb-22")}>
      <CardHeader className="">
        <CardTitle className="font-semibold">{`${student.firstName} ${student.lastName}`}</CardTitle>
        <CardDescription className="">{"BSc. Computer Science"}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex items-center gap-x-3">
            <Avatar className="w-12 h-12">
            <AvatarFallback className="text-white font-semibold bg-ahGreen text-lg">
                {`${student.firstName[0]} ${student.lastName[0]}`}
            </AvatarFallback>
        </Avatar>
            <div>
                <p className="text-thin text-ahTextGrey">{`Student ID ${student.studentNo.toString().split("").toSpliced(0, 4, "*", "*", "*", "*").join("")}`}</p>
                <Badge className="text-ahGreen px-3 py-1 bg-ahGrey rounded-sm">Degree Planning</Badge>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StudentDetailsCard