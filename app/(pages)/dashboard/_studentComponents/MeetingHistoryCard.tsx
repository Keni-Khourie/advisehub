import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton"
import Link from "next/link";
interface Props{
  data:number|undefined,
  isLoading:boolean;
  isError:boolean;
}

const MeetingHistoryCard = ({data, isLoading, isError}:Props) => {
  return (
      <Card className={cn("w-full md:w-[35%] rounded-md p-4 bg-white")}>
      <CardHeader className="">
        <CardTitle className="text-ahTextBlack font-semibold text-base">Meeting History</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full pb-6 content-center">
        <div className="flex flex-col justify-center items-start">
          {isLoading && <Skeleton className="w-5 h-8"/>}
          {isError &&<p className="font-semibold text-xl">{`- past meetings`}</p>}
            {data!==undefined &&<p className="font-semibold text-xl">{`${data} past meetings`}</p>}
            <Link href="#">
            <p className="font-thin text-ahTextGrey text-sm hover:underline cursor-pointer">View Notes and Meeting Details</p></Link>
            
        </div>
      </CardContent>
    </Card>
  )
}

export default MeetingHistoryCard