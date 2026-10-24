"use client";
import { useContext, useEffect } from "react";
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import AvailabilityTimeItem from "./AvailabilityTimeItem";
import { useGetAvailabilitiesByDateForAdvisorQuery } from "@/redux/features/main/availabilityApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { generateArray } from "@/lib/utilityFunctions";
import { combineDateAndTime } from "@/lib/utilityDateFunctions";
import FetchErrorMessage from "@/customUI/FetchErrorMessage";
import { format } from "date-fns";
const AvailabilityTimes = () => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const contextData = useContext(AdvisorAvailabilityContext);
  const {
    data: existingAvailabilities,
    isLoading,
    refetch,
    isError,
  } = useGetAvailabilitiesByDateForAdvisorQuery(
    {
      date:format(contextData.availabilityData.date, "yyyy-MM-dd"),
      timeZone:timeZone
    }
  );
  console.log(existingAvailabilities);
  console.log(contextData.availabilityData.date.toISOString());
  console.log(combineDateAndTime(contextData.availabilityData.date, "0:00 AM"));
  useEffect(() => {
    
    if (contextData.refetchData) {
      refetch();
    contextData.setIsLoading(false);
    contextData.setRefetchData(false);
    }
  }, [refetch, contextData.refetchData, contextData]);
  return (
    <div className="md:w-1/2 w-full md:h-[40vh] h-56 flex flex-col gap-y-3 overflow-y-scroll">
      {isLoading &&
        generateArray(6).map((item) => (
          <Skeleton key={item} className="h-12" />
        ))}
      {existingAvailabilities &&
        existingAvailabilities.map((availability, index) => (
          <AvailabilityTimeItem
            key={index}
            existingAvailability={availability}
          />
        ))}
      {existingAvailabilities && existingAvailabilities.length == 0 && (
        <p className="w-full text-center font-thin text-xs text-ahTextGrey">{`No available times for ${format(contextData.availabilityData.date, "iii dd MMM yyyy")}`}</p>
      )}

      {isError && <FetchErrorMessage />}
    </div>
  );
};

export default AvailabilityTimes;


