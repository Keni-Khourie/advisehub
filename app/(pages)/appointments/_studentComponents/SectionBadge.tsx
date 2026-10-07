"use client"
import {useContext} from 'react'
import { Badge } from '@/components/ui/badge';
import { StudentAppointmentContext } from './StudentAppointments';

const SectionBadge = () => {
    const contextData = useContext(StudentAppointmentContext)
    console.log(contextData);
  return (
   <Badge></Badge>
  )
}

export default SectionBadge