import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {Progress} from "@/components/ui/progress"
interface Props{
    percentComplete:number;
    completedCredits:number;
    remainingCredits:number;
}
const DegreeProgressCard = ({percentComplete, completedCredits, remainingCredits}:Props) => {
  return (
    <Card className={cn("w-full md:w-1/2 bg-ahCardBlue border-none border-ahBorderBlue shadow-sm rounded-lg px-3 pt-3 pb-8")}>
      <CardHeader className="">
        <CardTitle className="font-semibold text-base">Degree Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        <p className="font-bold text-2xl">{`${percentComplete}%`}</p>
        <Progress value={percentComplete}/>
        <p className="text-sm font-thin text-ahTextGrey">{`${completedCredits} completed • ${remainingCredits} remaining`}</p>
      </CardContent>
    </Card>
  )
}

export default DegreeProgressCard