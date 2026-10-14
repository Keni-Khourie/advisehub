"use client"
import { Button } from '@/components/ui/button';
import PageHeader from '@/customUI/PageHeader';
import WhiteButton from '@/customUI/WhiteButton';
import { getDummyStudentAdvisingNoteById } from '@/dummyData/dummyUtils';
import Link from 'next/link';
import AdvisorDetails from './AdvisorDetails';

import NextStepsCard from './NextStepsCard';
import RelatedInformationCard from './RelatedInformationCard';
import StudentAdvisorNoteCard from './StudentAdvisorNoteCard';
interface Props{
    noteId:number
}

console.log(typeof StudentAdvisorNoteCard, String(StudentAdvisorNoteCard).slice(0, 200));
const StudentAdvisingNote = ({noteId}:Props) => {
  //fetch advising note by student ID
  const advisingNote = getDummyStudentAdvisingNoteById(noteId)
  return (
    <div>
        <PageHeader headerText="Advising Note" subtitle="Full note details shared by your advisor." additionalClass="mb-10"/>
        <Link href="/advising-notes" className="">
        
        <WhiteButton text="← Back to all notes" additionalStyle="border border-ahLightBlue py-2 shadow-sm mb-10"/>
        </Link>
        
        
        <div className="flex flex-col gap-y-6 w-full">
         {advisingNote && <AdvisorDetails advisor={advisingNote.advisor} advisorTitle={advisingNote.advisorTitle} date={advisingNote.meetingDate} noteTitle={advisingNote.noteTitle}/>}
          <StudentAdvisorNoteCard note={advisingNote?.note}/>
          

          <div className="w-full h-full flex items-start gap-x-5 flex-wrap md:flex-nowrap">
            <NextStepsCard steps={advisingNote?.nextSteps}/>
            <RelatedInformationCard/>
          </div>
        </div>
    </div>
  )
}

export default StudentAdvisingNote