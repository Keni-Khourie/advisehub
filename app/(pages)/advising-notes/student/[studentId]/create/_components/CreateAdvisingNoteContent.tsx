"use client"

import PageHeader from "@/customUI/PageHeader";
import { dummyStudents } from "@/dummyData/dummyData";

interface Props{
    studentId:number
}
const CreateAdvisingNoteContent = ({studentId}:Props) => {
    //get student by student Id
    const student = dummyStudents.find((student)=>student.studentId===studentId)
  return (
    <div>
        <PageHeader headerText="Add Advising Note" subtitle="Write a note and choose its visibility" additionalClass="mb-10"/>


         <div className="bg-white px-4 py-4 border rounded-lg mb-10">
             {student && (<div className="flex flex-col gap-y-2">
                <p className="text-base font-semibold">{student.fullName}</p>
                <p className="font-thin text-sm text-ahTextGrey">{`${student.degree} • Student ID ${student.studentId.toString().split("").toSpliced(0, 4, "*", "*", "*", "*").join("")}`}</p>
                     </div>)}
                     {!student && <p className="text-base font-semibold">Student not found</p>}
         </div>
         <div className="flex flex-col gap-y-3 w-full">
            <p className="text-lg font-semibold">Advising Note</p>
            <div></div>
         </div>
        

    </div>
  )
}

export default CreateAdvisingNoteContent