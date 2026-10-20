"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import PageHeader from '@/customUI/PageHeader';
import React from 'react'
import WeekDaysSelector from './WeekDaysSelector';
import AvailabilityTimes from './AvailabilityTimes';
import AddAvailabilityTime from './AddAvailabilityTime';
import BlueButton from '@/customUI/BlueButton';
import WeeklyAvailability from "./WeeklyAvailability";
import ExistingAvailability from "./ExistingAvailability";
import ConfirmationDialog from "./ConfirmationDialog";

const AvailabilityContent = () => {
    const contextData = useContext(AdvisorAvailabilityContext)
   
//   const existingMeetings = [
//     "2026-10-20T09:00:00.000Z",
//     "2026-10-20T11:00:00.000Z",
//     "2026-10-21T13:00:00.000Z",
//   ];
//   async function handleSave(availability: string[]) {
//     const response = await fetch("/api/availability", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ availability }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to save availability");
//     }
//   }
  return (
    <div className="w-full">
        <PageHeader headerText="Manage Availability" subtitle="Set times students can book without conflicts." additionalClass="mb-10"/>
        <div className="w-full">
            <WeekDaysSelector/>
            <p className="mb-4 font-semibold">Available Times</p>
            <div className="w-full flex items-start flex-wrap-reverse md:flex-nowrap gap-y-6 gap-x-6 mb-10 md:mb-20">
                <AvailabilityTimes/>
                <AddAvailabilityTime/>
            </div>
            <div className="w-full flex items-start justify-center md:justify-end">
                
                <BlueButton text="Save Availability" additionalStyle="w-full md:w-2/6"/>
            </div>
            <ConfirmationDialog/>
        </div>
{/* 
        <div>
            <WeeklyAvailability
      existingMeetings={existingMeetings}
      onSave={handleSave}
    />
        </div> */}
    </div>
  )
}

export default AvailabilityContent