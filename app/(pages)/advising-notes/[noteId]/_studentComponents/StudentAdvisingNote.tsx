"use client"
import PageHeader from '@/customUI/PageHeader';
interface Props{
    noteId:number
}
const StudentAdvisingNote = ({noteId}:Props) => {
  //fetch advising note by student ID
  return (
    <div>
        <PageHeader headerText="Advising Note" subtitle="Full note details shared by your advisor." additionalClass=""/>
        <p>{`Note ID: ${noteId}`}</p>
    </div>
  )
}

export default StudentAdvisingNote