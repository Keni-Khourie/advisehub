"use client"
import PageHeader from "@/customUI/PageHeader"
import SectionHeader from "@/customUI/SectionHeader";
import {dummyStudentAdvisingNotes, dummyStudents} from "@/dummyData/dummyData"
import StudentNotesListCard from "./_components/StudentNotesListCard";
import Link from "next/link";
import BlueButton from "@/customUI/BlueButton";
import {useGetStudentByStudentIdQuery} from "@/redux/features/main/studentApiSlice"
interface Props{
    studentId:number
}

const StudentsAdvisingNotesContent = ({studentId}:Props) => {
    //get student by ID 
    //(find all notes with student ID, regardless of which advisor made it)
    //can include filter to filter based on notes made by that advisor

    const {data:student} = useGetStudentByStudentIdQuery(studentId)

  return (
    <div className="w-full">
        <PageHeader headerText="Advising Notes" subtitle="View student's advising notes" additionalClass="mb-10"/>
        {!student && (
            <div>
                <p>Student with ID ${studentId} does not exist</p>
            </div>
        )}
        {student && (<div>
                <SectionHeader headerText={student.fullName}  additionalClass="mb-10"/>

                <div className="md:h-[50vh] overflow-y-scroll  flex flex-col gap-y-4 mb-3 md:mb-10">
                    {dummyStudentAdvisingNotes.map((note, index)=> <StudentNotesListCard key={index} note={note}/>)}
                    
                </div>
                <div className="w-full flex justify-center md:justify-end">
                    <Link href={`/advising-notes/student/${studentId}/create`} className="w-full md:w-[25%]">
                    <BlueButton text="+ Add Advising Note" additionalStyle="w-full"/>
                    </Link>
                </div>
        </div>)}
        
    </div>
  )
}

export default StudentsAdvisingNotesContent