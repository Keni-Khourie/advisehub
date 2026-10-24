"use client"
import {useContext, useEffect} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import ExistingAvailabilityItem from './ExistingAvailabilityItem';
import {useGetAvailabilitiesByDateForAdvisorQuery} from "@/redux/features/main/availabilityApiSlice"
import {Skeleton} from "@/components/ui/skeleton"
import {generateArray} from "@/lib/utilityFunctions"
import FetchErrorMessage from "@/customUI/FetchErrorMessage"

const ExistingAvailability = () => {
  const contextData = useContext(AdvisorAvailabilityContext)
  console.log(contextData);
  const {data:existingAvailabilities, isLoading, refetch, isError} =useGetAvailabilitiesByDateForAdvisorQuery(contextData.availabilityData.date.toISOString())

  useEffect(()=>{
    if(contextData.refetchData)
      refetch()
    contextData.setRefetchData(false)
    contextData.setPageData({...contextData.pageData, isLoading:false})
  },[refetch, contextData.refetchData, contextData])

  return (
    <div className="rounded-lg border bg-white w-full md:w-1/2 px-3 py-4">
      <p className="font-semibold  mb-2">Existing Meetings</p>
      <div className="md:h-[20vh] overflow-y-scroll flex flex-col gap-y-3 ">
        {isLoading && generateArray(6).map((item)=><Skeleton key={item} className="h-12"/>)}
        {existingAvailabilities&& existingAvailabilities.map((availability, index)=>  <ExistingAvailabilityItem key={index} existingAvailability={availability}/>)}
        {isError && <FetchErrorMessage/>}
       
       
      </div>
    </div>
  )
}

export default ExistingAvailability