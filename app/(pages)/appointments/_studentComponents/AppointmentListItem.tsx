import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExistingMeetingData } from "@/dummyData/dummyTypes";
import { cn } from "@/lib/utils";
import { StudentAppointmentSection } from "@/types";
import { format } from "date-fns";
import { Dot } from "lucide-react";
import Link from "next/link";

interface Props {
  type: StudentAppointmentSection;
  data: ExistingMeetingData;
  isLoading: boolean;
}

const AppointmentListItem = ({ type, data, isLoading }: Props) => {
  return (
    <div className="flex justify-between items-center ps-3 pe-5 py-6 rounded-sm border">
      {!isLoading && (
        <div className="flex gap-x-5">
          <div className="font-bold bg-ahGrey flex flex-col justify-center text-center border py-5 px-3 rounded-sm">
            {format(data.startDateTime, "MMM dd").toLocaleUpperCase()}
          </div>

          <div>
            <p className="mb-1">{data.meetingReason}</p>
            {type === "Upcoming" && (
              <p className="font-thin text-ahTextGrey text-sm flex">
                {data.advisor}
                <Dot />
                {`${format(data.startDateTime, "h a")} - ${format(data.endDateTime, "h a")}`}
              </p>
            )}
            {type === "Past Meetings" && (
              <div className="flex flex-col gap-y-1 font-thin text-ahTextGrey text-sm">
                <p>{data.advisor}</p>
                <p>{data.meetingReason}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex gap-x-5">
          <div className="rounded-sm w-20 h-20">
            <Skeleton className="w-full h-full" />
          </div>
          <div>
            <div className="mb-2">
              <Skeleton className="h-4 w-50" />
            </div>
            {type === "Upcoming" && (
              <div className="font-thin text-ahTextGrey text-sm flex">
                <Skeleton className="h-4 w-72" />
              </div>
            )}
            {type === "Past Meetings" && (
              <div className="flex flex-col gap-y-2 font-thin text-ahTextGrey text-sm">
                <div>
                  <Skeleton className="h-4 w-50" />
                </div>
                <div>
                  <Skeleton className="h-4 w-50" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Link href="#" className={cn(isLoading &&"cursor-not-allowed")}>
        <Button className={cn("bg-white hover:bg-ahGrey text-ahTextBlack font-semibold cursor-pointer rounded-sm py-4 px-6 border-2 border-stone-300", isLoading && "cursor-not-allowed")} disabled={isLoading}>
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default AppointmentListItem;
