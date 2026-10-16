"use client"
import PageHeader from "@/customUI/PageHeader"
import {dummyStudents} from "@/dummyData/dummyData"
interface Props{
    studentId:number
}

const StudentsAdvisingNotesContent = ({studentId}:Props) => {
    //get student by ID or include student name and data in response
    //get student notes data bu student Id (find all notes with student ID, regardless of which advisor made it)
    //can include filter to filter based on notes made by that advisor

    const student = dummyStudents.find((student)=>student.studentId===studentId)

  return (
    <div className="w-full">
        <PageHeader headerText="Advising notes" subtitle="View and advising notes for student"/>
        {!student && (
            <div>
                <p>Student with ID ${studentId} does not exist</p>
            </div>
        )}
        <p>{`Student ID: ${studentId}`}</p>
    </div>
  )
}

export default StudentsAdvisingNotesContent