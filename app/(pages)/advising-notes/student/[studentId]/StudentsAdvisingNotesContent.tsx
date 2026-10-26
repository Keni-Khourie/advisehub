"use client"
import PageHeader from "@/customUI/PageHeader"
import SectionHeader from "@/customUI/SectionHeader";
import StudentNotesListCard from "./_components/StudentNotesListCard";
import Link from "next/link";
import BlueButton from "@/customUI/BlueButton";
import {useGetStudentByStudentIdQuery} from "@/redux/features/main/studentApiSlice"
import {useGetStudentAdvisingNotesForAdvisorQuery} from "@/redux/features/main/advisingNotesApiSlice"
import {Skeleton} from "@/components/ui/skeleton"
import {generateArray} from "@/lib/utilityFunctions"
interface Props{
    studentId:number
}

const StudentsAdvisingNotesContent = ({studentId}:Props) => {
    //get student by ID 
    //(find all notes with student ID, regardless of which advisor made it)
    //can include filter to filter based on notes made by that advisor

    const {data:student, isLoading, isError} = useGetStudentByStudentIdQuery(studentId)

    const {data:advisingNotes, isLoading:notesLoading, isError:notesError} = useGetStudentAdvisingNotesForAdvisorQuery(studentId)

  return (
    <div className="w-full">
        <PageHeader headerText="Advising Notes" subtitle="View student's advising notes" additionalClass="mb-10"/>
        {!isError && !student && (
            <div>
                <p className="font-thin">Unable to get student details</p>
            </div>
        )}
        {isLoading && (
            
                <Skeleton className="mb-10 w-40 h-15"/>
                
            
        )}
        {student && (<div>
                <SectionHeader headerText={student.fullName}  additionalClass="mb-10"/>

                <div className="md:h-[50vh] overflow-y-scroll  flex flex-col gap-y-4 mb-3 md:mb-10">
                    {advisingNotes &&advisingNotes.map((note, index)=> <StudentNotesListCard key={index} note={note}/>)}
                    {notesLoading && generateArray(6).map((item)=><Skeleton key={item} className="h-20 w-full"/>)}
                    {notesError && <p className="w-full text-center">Could not get notes</p>}
                    
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