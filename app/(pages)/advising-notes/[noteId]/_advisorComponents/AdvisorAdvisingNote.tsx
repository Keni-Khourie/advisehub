"use client"
import PageHeader from '@/customUI/PageHeader';
import WhiteButton from '@/customUI/WhiteButton';
import Link from 'next/link';
import StudentDetails from "./StudentDetails"
import AdvisorNoteCard from "./AdvisorNoteCard"
import AdvisorRelatedInformation from "./AdvisorRelatedInformation"
import NextStepsCard from '../_components/NextStepsCard';
import {Skeleton} from "@/components/ui/skeleton"
import {useGetAdvisingNoteByIdForAdvisorQuery} from "@/redux/features/main/advisingNotesApiSlice"

interface Props{
    noteId:number
}

const AdvisorAdvisingNote = ({noteId}:Props) => {
  //fetch note by noteId
  const {data:note, isLoading} =useGetAdvisingNoteByIdForAdvisorQuery(noteId)
 
  return (
    <div className="w-full">
        <PageHeader headerText="Advising Note" subtitle="View note made during meeting" additionalClass="mb-10"/>
        <Link href="/advising-notes" className="">
        
        <WhiteButton text="← Back to all notes" additionalStyle="border border-ahBorderBlue py-2 shadow-sm mb-10"/>
        </Link>
        
        {isLoading && (
          <div className="flex flex-col gap-y-6 w-full">
            <Skeleton className="w-full h-40"/>
            <Skeleton className="w-full h-40"/>
            <div className="w-full h-full flex items-start gap-x-5 flex-wrap md:flex-nowrap">
              <Skeleton className="w-full md:w-1/2 h-40"/>
            <Skeleton className="w-full md:w-1/2 h-40"/>
            </div>
          </div>
        )}
       {note && <div className="flex flex-col gap-y-6 w-full">
          
          <StudentDetails note={note}/>
          <AdvisorNoteCard noteTitle={note.title} noteContent={note.content}/>
          <div className="w-full h-full flex items-start gap-x-5 flex-wrap md:flex-nowrap">
            <NextStepsCard steps={note.nextSteps}/>
            <AdvisorRelatedInformation studentId={parseInt(note.studentId)}/>
          </div>
        </div>}
    </div>
  )
}

export default AdvisorAdvisingNote