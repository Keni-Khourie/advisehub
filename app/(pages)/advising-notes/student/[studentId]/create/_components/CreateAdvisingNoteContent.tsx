"use client"

import PageHeader from "@/customUI/PageHeader";
import {useGetStudentByStudentIdQuery} from "@/redux/features/main/studentApiSlice"
import CreateStudentAdvisingNoteForm from "./CreateStudentAdvisingNoteForm";

interface Props{
    studentId:number
}
const CreateAdvisingNoteContent = ({studentId}:Props) => {
  const {data:student, isLoading, isError} = useGetStudentByStudentIdQuery(studentId)
    
    
  return (
    <div>
        <PageHeader headerText="Add Advising Note" subtitle="Write a note and choose its visibility" additionalClass="mb-10"/>


         <div className="bg-white px-4 py-4 border rounded-lg mb-10">
             {student && (<div className="flex flex-col gap-y-2">
                <p className="text-base font-semibold">{student.fullName}</p>
                <p className="font-thin text-sm text-ahTextGrey">{`${student.degree} • Student ID ${student.studentId.toString().split("").toSpliced(0, 4, "*", "*", "*", "*").join("")}`}</p>
                     </div>)}
                     {isLoading && <p className="text-base font-semibold">Loading student information...</p>}
                     {!isError && !student && <p className="text-base font-semibold">Student not found</p>}
         </div>
         <CreateStudentAdvisingNoteForm studentId={studentId}/>
        

    </div>
  )
}

export default CreateAdvisingNoteContent