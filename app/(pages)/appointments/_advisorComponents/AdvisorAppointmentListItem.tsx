import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AppointmentSection } from "@/types/types";
import { format } from "date-fns";
import Link from "next/link";
import { AppointmentDataForAdvisor } from "@/redux/features/main/appointmentApiSlice";
interface Props {
  type: AppointmentSection;
  data: AppointmentDataForAdvisor;
  isLoading: boolean;
}
const AdvisorAppointmentListItem = ({ type, data, isLoading }: Props) => {
  return (
    <div className="flex justify-between items-center ps-3 pe-5 py-6 rounded-md bg-white border">
      {!isLoading && (
        <div className="flex gap-x-5">
          <div className="font-bold bg-ahGrey flex flex-col justify-center text-center border w-22 h-22 rounded-sm">
            {format(data.date, "MMM dd").toLocaleUpperCase()}
          </div>

          <div>
            <p className="mb-1 font-semibold text-ahTextBlack">
              {data.studentFullName}
            </p>
            {type === "Upcoming" && (
              <p className="font-thin text-ahTextGrey text-sm">
                {`${data.studentDegree} • ${format(data.date, "h:mm a")}`}
              </p>
            )}
            {type === "Past Meetings" && (
              <p className="font-thin text-ahTextGrey text-sm">
                {data.studentDegree}
              </p>
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
      <div
        className={cn(
          type === "Past Meetings" ? "flex items-center gap-x-4" : "",
        )}
      >
        {type === "Past Meetings" && (
          <Badge className="text-green-600 font-semibold bg-green-200 px-5 ">
            Completed
          </Badge>
        )}
        <Link
          href={
            `/appointments/${data.id}`
          }
          className={cn(isLoading && "cursor-not-allowed")}
        >
          <Button
            className={cn(
              "bg-white hover:bg-ahGrey text-ahTextBlack font-semibold cursor-pointer rounded-sm py-4 px-6 border-2 border-stone-300",
              isLoading && "cursor-not-allowed",
            )}
            disabled={isLoading}
          >
            View Summary
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdvisorAppointmentListItem;
