import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Props{
    completedCredits:number;
    remainingCredits:number;
    percentComplete:number
}

const DegreeProgressCard = ({completedCredits, remainingCredits, percentComplete}:Props) => {
  return (
     <Card className={cn("border rounded-sm bg-ahGrey")}>
      <CardHeader className="">
        <CardTitle className="">{"BSc. Computer science"}</CardTitle>
        <CardDescription className="">Degree Progress Overview</CardDescription>
      </CardHeader>
      <CardContent className="w-[90%] ps-5 pb-10">
        <div className="flex flex-col justify-center gap-y-12">
            <div className="w-full flex items-center gap-x-60">
                <div className="flex items-center gap-x-3">
                    <p className="font-bold text-4xl">{completedCredits}</p>
                    <p className="font-thin text-ahTextGrey">Completed Credits</p>
                </div>
                <div className="flex items-center gap-x-3">
                    <p className="font-bold text-4xl text-ahGreen">{remainingCredits}</p>
                    <p className="font-thin text-ahTextGrey">Remaining Credits</p>
                </div>
            </div>
            <div className="w-full flex flex-col gap-y-2 justify-center">
                <Progress value={78}/>
                <p className="font-semibold text-ahGreen text-sm">{`${percentComplete}% complete`}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DegreeProgressCard