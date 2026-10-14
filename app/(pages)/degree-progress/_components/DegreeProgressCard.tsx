import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import DegreeCreditsCard from "./DegreeCreditsCard";

interface Props{
    completedCredits:number;
    remainingCredits:number;
    percentComplete:number
}

const DegreeProgressCard = ({completedCredits, remainingCredits, percentComplete}:Props) => {
  return (
     <div className={cn("border border-ahLightBlue rounded-lg bg-ahCardBlue py-6 px-5")}>
      <div className="flex gap-x-10 items-center">
       <div className="">
        <div className="bg-ahLightBlue border rounded-full p-3">
          <div className="bg-ahGreen border rounded-full p-3">
            <div className="bg-white border rounded-full text-center font-bold p-6 w-28 h-28 flex flex-col justify-center">
              <p className="text-2xl">{`${percentComplete}%`}</p>
            </div>
          </div>
        </div>
       </div>
       <div className="w-[70%] flex-col">
        <div className="w-full mb-5">
          <p className="font-bold text-3xl">{"BSc Computer Science"}</p>
          <p className="font-thin text-ahTextGrey text-sm">{`Progress towards the ${completedCredits+remainingCredits}-credit degree requirement`}</p>
        </div>
        <div className="flex justify-between items-center gap-x-5 mb-4">
          <DegreeCreditsCard title="Completed" credits={completedCredits}/>
          <DegreeCreditsCard title="Remaining" credits={remainingCredits} fontStyling="text-ahGreen"/>
          <DegreeCreditsCard title="Total Required" credits={completedCredits+remainingCredits}/>
        </div>
        <div className="flex items-center w-full gap-x-10">
          <p className="text-sm w-max-content font-semibold md:text-nowrap">{`${completedCredits} of ${completedCredits+remainingCredits} credits completed`}</p>
          <div className="w-full ">
            <Progress value={percentComplete}/>
          </div>
        </div>
       </div>
      </div>
    </div>
  )
}

export default DegreeProgressCard