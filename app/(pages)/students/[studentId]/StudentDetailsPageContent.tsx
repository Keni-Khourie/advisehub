"use client"
import PageHeader from '@/customUI/PageHeader';
interface Props{
    studentId:number
}
const StudentDetailsPageContent = ({studentId}:Props) => {
    //fetch student by studentId
  return (
    <div>
        <PageHeader headerText="Student Profile" subtitle="Student context before and after advising."/>
        <p>{`Student ID:${studentId}`}</p>
    </div>
  )
}

export default StudentDetailsPageContent