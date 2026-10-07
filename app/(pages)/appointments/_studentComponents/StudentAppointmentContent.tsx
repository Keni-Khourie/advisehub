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
 */