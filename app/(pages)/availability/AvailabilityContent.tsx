"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";
import PageHeader from '@/customUI/PageHeader';
import React from 'react'
import WeekDaysSelector from './WeekDaysSelector';
import AvailabilityTimes from './AvailabilityTimes';
import AddAvailabilityTime from './AddAvailabilityTime';
import BlueButton from '@/customUI/BlueButton';

const AvailabilityContent = () => {
    const contextData = useContext(AdvisorAvailabilityContext)
  return (
    <div className="w-full">
        <PageHeader headerText="Manage Availability" subtitle="Set times students can book without conflicts."/>
        <div className="w-full">
            <WeekDaysSelector/>
            <p className="mb-4 font-semibold">Available Times</p>
            <div className="w-full flex items-start flex-wrap md:flex-nowrap gap-y-6 gap-x-6 mb-10 md:mb-20">
                <AvailabilityTimes/>
                <AddAvailabilityTime/>
            </div>
            <div className="flex md:justify-end justify-center">
                <BlueButton text="Save Availability" additionalStyle="w-full md:w-2/6"/>
            </div>
        </div>
    </div>
  )
}

export default AvailabilityContent