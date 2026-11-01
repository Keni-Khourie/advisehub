import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppointmentDataForStudent } from "@/redux/features/main/appointmentApiSlice";
import { cn } from "@/lib/utils";
import { AppointmentSection } from "@/types/types";
import { format, addMinutes } from "date-fns";
import Link from "next/link";
import {Badge} from "@/components/ui/badge"

interface Props {
  type: AppointmentSection;
  data: AppointmentDataForStudent;
  isLoading: boolean;
}

const AppointmentListItem = ({ type, data, isLoading }: Props) => {
  return (
    <div className="flex justify-between items-center ps-3 pe-5 py-6 rounded-md bg-white border">
      {!isLoading && data && (
        <div className="flex gap-x-5">
          <div className="font-bold bg-ahGrey flex flex-col justify-center text-center border w-22 h-22 rounded-sm">
            {format(data.date, "MMM dd").toLocaleUpperCase()}
            {type==="Past Meetings" && (<p className="text-xs font-thin text-ahTextGrey">{format(data.date, "yyyy")}</p>)}
          </div>

          <div>
            <p className="mb-1 font-semibold text-ahTextBlack">
              {data.advisorSpecialization}
            </p>
            {type === "Upcoming" && (
              <p className="font-thin text-ahTextGrey text-sm">
                {`${data.advisorTitle} ${data.advisorFullName} • ${format(data.date, "h:mm a")} - ${format(addMinutes(data.date,30), "h:mm a")}`}
              </p>
            )}
            {type === "Past Meetings" && (
              <div className="flex flex-col gap-y-1 font-thin text-ahTextGrey text-sm">
                <p>{`${data.advisorTitle} ${data.advisorFullName}`}</p>
                <p>{data.advisorSpecialization}</p>
              </div>
            )}
            {data && data.appointmentStatus=="CANCELLED" && <Badge className="bg-red-100 text-red-500 font-semibold px-5 py-1 opacity-60 mt-2">CANCELLED</Badge>}
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
      <Link
        href={`/appointments/${data.id}`}
        className={cn(isLoading && "cursor-not-allowed")}
      >
        <Button
          className={cn(
            "bg-white hover:bg-ahGrey text-ahTextBlack font-semibold cursor-pointer rounded-sm py-4 px-6 border-2 border-stone-300",
            isLoading && "cursor-not-allowed",
          )}
          disabled={isLoading}
        >
          View Details
        </Button>
      </Link>
    </div>
  );
};

export default AppointmentListItem;
