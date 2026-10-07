import {useContext} from 'react'
import { StudentAppointmentContext } from './StudentAppointments';
import { StudentAppointmentSection, StudentAppointmentView } from '@/types';
import { studentAppointmentHeadings } from '@/constants';

const StudentAppointmentContent = () => {
    const contextData = useContext(StudentAppointmentContext)
  return (
    <div>

    </div>
  )
}

export default StudentAppointmentContent

