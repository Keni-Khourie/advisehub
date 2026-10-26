import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import DegreeCreditsCard from "./DegreeCreditsCard";
import { DegreeInfo} from "@/redux/features/main/degreeApiSlice"
import {Skeleton} from "@/components/ui/skeleton"
import FetchErrorMessage from "@/customUI/FetchErrorMessage"
interface Props{
    data:DegreeInfo|undefined;
    isLoading:boolean;
    isError:boolean
}

const DegreeProgressCard = ({data, isLoading, isError}:Props) => {
  return (
     <div className={cn("border border-ahBorderBlue rounded-lg bg-ahCardBlue py-6 px-5")}>
      {isLoading && <Skeleton className="w-full h-60"/>}
      {isError && !data && (
        <div className="w-full flex justify-center">
          <FetchErrorMessage/>
        </div>
      )}
      {data && (<div className="flex gap-x-10 items-center">
       <div className="">
        <div className="bg-ahLightBlue border rounded-full p-3">
          <div className="bg-ahGreen border rounded-full p-3">
            <div className="bg-white border rounded-full text-center font-bold p-6 w-28 h-28 flex flex-col justify-center">
              <p className="text-2xl">{`${data.degreeProgressPercent}%`}</p>
            </div>
          </div>
        </div>
       </div>
       <div className="w-[70%] flex-col">
        <div className="w-full mb-5">
          <p className="font-bold text-3xl">{`${data.degreeClassificationAbbreviation} ${data.degreeName}`}</p>
          <p className="font-thin text-ahTextGrey text-sm">{`Progress towards the ${data.requiredCredits}-credit degree requirement`}</p>
        </div>
        <div className="flex justify-between items-center gap-x-5 mb-4">
          <DegreeCreditsCard title="Completed" credits={data.completedCredits}/>
          <DegreeCreditsCard title="Remaining" credits={data.remainingCredits} fontStyling="text-ahGreen"/>
          <DegreeCreditsCard title="Total Required" credits={data.requiredCredits}/>
        </div>
        <div className="flex items-center w-full gap-x-10">
          <p className="text-sm w-max-content font-semibold md:text-nowrap">{`${data.completedCredits} of ${data.requiredCredits} credits completed`}</p>
          <div className="w-full ">
            <Progress value={data.degreeProgressPercent}/>
          </div>
        </div>
       </div>
      </div>)}
    </div>
  )
}

export default DegreeProgressCard