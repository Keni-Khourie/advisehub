import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

//interface Props {}
const DegreeProgressCard = () => {
  return (
    <Card className={cn("w-full rounded-sm px-3 py-3")}>
        <CardHeader className="">
            <CardTitle className="font-semibold">Degree Progress</CardTitle>
            <CardDescription className="text-sm font-light">Bsc Computer Science</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center gap-y-3">
          <div className="flex justify-between items-center w-1/2">
            <p className="font-bold text-4xl">94</p>
            <p className="font-light text-ahTextGrey">Completed</p>
          </div>
          <div className="flex justify-between items-center w-1/2">
            <p className="font-bold text-ahGreen text-2xl">26</p>
            <p className="font-light text-ahTextGrey">Remaining</p>
          </div>
          <div className="mt-10 flex flex-col gap-y-2 justify-center">
            
              <Progress value={78} className="" />
           
            <p className="font-semibold text-ahGreen text-sm">78% complete</p>
          </div>
        </CardContent>
    </Card>
  )
}

export default DegreeProgressCard