"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import ExistingAvailabilityItem from './ExistingAvailabilityItem';

import {dummyExistingAdvisorAvailabilities} from "@/dummyData/dummyData"

const ExistingAvailability = () => {
  return (
    <div className="rounded-lg border bg-white w-full md:w-1/2 px-3 py-4">
      <p className="font-semibold  mb-2">Existing Meetings</p>
      <div className="md:h-[20vh] overflow-y-scroll flex flex-col gap-y-3 ">
        {dummyExistingAdvisorAvailabilities.map((availability, index)=>  <ExistingAvailabilityItem key={index} existingAvailability={availability}/>)}
       
       
      </div>
    </div>
  )
}

export default ExistingAvailability