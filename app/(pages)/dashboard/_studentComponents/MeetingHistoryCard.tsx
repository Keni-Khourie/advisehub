import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MeetingHistoryCard = () => {
  return (
      <Card className={cn("w-full md:w-[35%] rounded-md p-4 bg-white")}>
      <CardHeader className="">
        <CardTitle className="text-ahTextBlack font-semibold text-base">Meeting History</CardTitle>
      </CardHeader>
      <CardContent className="flex h-full pb-6 content-center">
        <div className="flex flex-col justify-center items-start">
            <p className="font-semibold text-xl">{`${6} past meetings`}</p>
            <p className="font-thin text-ahTextGrey text-sm">View Notes and Meeting Details</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default MeetingHistoryCard