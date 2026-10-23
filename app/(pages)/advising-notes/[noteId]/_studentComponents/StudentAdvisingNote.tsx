"use client"
import PageHeader from '@/customUI/PageHeader';
import WhiteButton from '@/customUI/WhiteButton';
import { getDummyStudentAdvisingNoteById } from '@/dummyData/dummyUtils';
import Link from 'next/link';
import AdvisorDetails from './AdvisorDetails';

import NextStepsCard from '../_components/NextStepsCard';
import RelatedInformationCard from './RelatedInformationCard';
import StudentAdvisorNoteCard from './StudentAdvisorNoteCard';
import {useGetAdvisingNoteByIdForStudentQuery} from "@/redux/features/main/advisingNotesApiSlice"
import {Skeleton} from "@/components/ui/skeleton"
interface Props{
    noteId:number
}


const StudentAdvisingNote = ({noteId}:Props) => {

  //fetch advising note by student ID
  const {data:advisingNote, isLoading}=useGetAdvisingNoteByIdForStudentQuery(noteId)
  console.log(advisingNote);
  return (
    <div>
        <PageHeader headerText="Advising Note" subtitle="Full note details shared by your advisor." additionalClass="mb-10"/>
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
        
       {advisingNote && (<div className="flex flex-col gap-y-6 w-full">
          <AdvisorDetails note={advisingNote}/>
          <StudentAdvisorNoteCard note={advisingNote.content}/>
          

          <div className="w-full h-full flex items-start gap-x-5 flex-wrap md:flex-nowrap">
            <NextStepsCard steps={advisingNote?.nextSteps}/>
            <RelatedInformationCard/>
          </div>
        </div>)}
    </div>
  )
}

export default StudentAdvisingNote