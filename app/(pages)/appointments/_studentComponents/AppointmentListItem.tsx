import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExistingMeetingData } from "@/dummyData/dummyTypes";
import { cn } from "@/lib/utils";
import { AppointmentSection } from "@/types/types";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  type: AppointmentSection;
  data: ExistingMeetingData;
  isLoading: boolean;
}

const AppointmentListItem = ({ type, data, isLoading }: Props) => {
  return (
    <div className="flex justify-between items-center ps-3 pe-5 py-6 rounded-md bg-white border">
      {!isLoading && (
        <div className="flex gap-x-5">
          <div className="font-bold bg-ahGrey flex flex-col justify-center text-center border w-22 h-22 rounded-sm">
            {format(data.startDateTime, "MMM dd").toLocaleUpperCase()}
          </div>

          <div>
            <p className="mb-1 font-semibold text-ahTextBlack">{data.meetingReason}</p>
            {type === "Upcoming" && (
              <p className="font-thin text-ahTextGrey text-sm">
               { `${data.advisor} • ${format(data.startDateTime, "h:mm a")} - ${format(data.endDateTime, "h:mm a")}` }
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
          <div className="rounded-sm w-22 h-22">
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
      <Link href={`/appointments/${data.id}`} className={cn(isLoading &&"cursor-not-allowed")}>
        <Button className={cn("bg-white hover:bg-ahGrey text-ahTextBlack font-semibold cursor-pointer rounded-sm py-4 px-6 border-2 border-stone-300", isLoading && "cursor-not-allowed")} disabled={isLoading}>
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default AppointmentListItem;
