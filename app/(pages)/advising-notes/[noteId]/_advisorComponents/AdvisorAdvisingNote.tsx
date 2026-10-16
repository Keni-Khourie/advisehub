"use client"
import PageHeader from '@/customUI/PageHeader';
import WhiteButton from '@/customUI/WhiteButton';
import Link from 'next/link';
import StudentDetails from "./StudentDetails"
import AdvisorNoteCard from "./AdvisorNoteCard"
import AdvisorRelatedInformation from "./AdvisorRelatedInformation"
import NextStepsCard from '../_components/NextStepsCard';
import {dummyAdvisorNotes} from "@/dummyData/dummyData"
//import {Skeleton} from "@/components/ui/skeleton"

interface Props{
    noteId:number
}

const AdvisorAdvisingNote = ({noteId}:Props) => {
  //fetch note by noteId
  const note = dummyAdvisorNotes.find((note)=>note.id===noteId)
  return (
    <div className="w-full">
        <PageHeader headerText="Advising Note" subtitle="View note made during meeting" additionalClass="mb-10"/>
        <Link href="/advising-notes" className="">
        
        <WhiteButton text="← Back to all notes" additionalStyle="border border-ahBorderBlue py-2 shadow-sm mb-10"/>
        </Link>
        {/** Add skeletion here */}
        <div className="flex flex-col gap-y-6 w-full">
          <StudentDetails note={note}/>
          <AdvisorNoteCard noteTitle={note?.noteTitle} noteContent={note?.note}/>
          <div className="w-full h-full flex items-start gap-x-5 flex-wrap md:flex-nowrap">
            <NextStepsCard steps={note?.nextSteps}/>
            <AdvisorRelatedInformation studentId={note?.studentId}/>
          </div>
        </div>
    </div>
  )
}

export default AdvisorAdvisingNote