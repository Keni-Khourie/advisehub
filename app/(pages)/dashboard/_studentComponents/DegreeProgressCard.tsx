import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils';
import Image from "next/image";
import {DashboardDegreeInfo} from "@/redux/features/main/dashboardApiSlice"
import {Skeleton} from "@/components/ui/skeleton"

interface Props {
  data:DashboardDegreeInfo|undefined,
  isLoading:boolean;
  isError:boolean;
}
const DegreeProgressCard = ({data, isLoading, isError}:Props) => {
  return (
    <Card className={cn("w-full md:w-[35%] rounded-md p-4 bg-white")}>
        <CardHeader className="">
            <CardTitle className="text-ahTextBlack font-semibold text-base">Degree Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center w-full">
          {isLoading && <Skeleton className="h-12 w-10"/>}
          {isError && !data && <p className="text-xs font-thin text-ahTextGreen">Error getting degree info</p>}
          {data &&(<div className="w-1/2 flex flex-col justify-center">
            
              <p className="text-ahTextBlack font-bold text-4xl mb-3">{`${data.degreeProgressPercent}%`}</p>
           
            <p className="text-sm font-thin text-ahTextGrey">{`${data.completedCredits} completed`}</p>
            <p className="text-sm font-thin text-ahTextGrey">{`${data.remainingCredits} remaining`}</p>
          </div>)}
          <div className="w-full">
            <Image src="/degreeProgressCardImage.png" alt="student degree progress" width={500} height={500} className=""/> 
          </div>
        </CardContent>
    </Card>
  )
}

export default DegreeProgressCard