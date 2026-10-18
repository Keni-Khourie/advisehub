"use client"
import {useContext} from "react"
import { AdvisorAvailabilityContext } from "./AdvisorAvailability";

import WhiteButton from '@/customUI/WhiteButton';


const AddAvailabilityTime = () => {
    const contextData = useContext(AdvisorAvailabilityContext)
  return (
    <div className="md:w-1/2 w-full bg-white border rounded-lg px-3 py-3">
        <p className="font-semibold mb-2">Add an available time</p>
        <div></div>
        <div className="flex justify-center md:justify-end">
            <WhiteButton text="+ Add Time" additionalStyle="border border-ahBorderBlue"/>
        </div>
    </div>
  )
}

export default AddAvailabilityTime