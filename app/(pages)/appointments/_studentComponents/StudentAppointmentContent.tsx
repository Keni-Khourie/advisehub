"use client"
import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
import { StudentAppointmentSection, StudentAppointmentView } from '@/types';
import { studentAppointmentHeadings } from '@/constants';

const StudentAppointmentContent = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
    <div>

    </div>
  )
}

export default StudentAppointmentContent

/*
Note to self:
set view and section badge via context
for the context, set the advisor to an Advisor object. This way in the review section, you can show the advisor's name and office. Also final form, you populate it with the advisor's Id and include the optional note which would be a string.
 */