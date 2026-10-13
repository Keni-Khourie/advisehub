"use client"
import {ChangeEvent, useContext} from 'react'
import { StudentScheduleAppointmentContext } from './StudentAppointmentSchedule';
import { Textarea } from "@/components/ui/textarea"


const GeneralAdvisingQuestion = () => {
    const contextData = useContext(StudentScheduleAppointmentContext)
    const updateGeneralAdvisingQuestion = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        contextData.setAppointmentDetails({...contextData.appointmentDetails, generalAdvisingQuestion:e.target.value})

    }
  return (
    <div className="bg-white w-full md:w-1/3  border rounded-lg p-3 flex flex-col justify-center gap-y-5">
        <div className="flex flex-col items-start gap-y-1 justify-center">
            <p className="font-semibold text-base">General advising Question</p>
            <p className="font-thin text-ahTextGrey text-sm">If you concern is not listed, briefly describe it</p>
        </div>
        <Textarea placeholder="Type your question here..." onChange={updateGeneralAdvisingQuestion} className="h-full bg-ahGrey p-4" value={contextData.appointmentDetails.generalAdvisingQuestion} />
    </div>
  )
}

export default GeneralAdvisingQuestion