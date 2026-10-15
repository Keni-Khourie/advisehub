"use client"
import PageHeader from '@/customUI/PageHeader';
import React from 'react'
import AdvisingNotesCard from './AdvisingNotesCard';
import { dummyStudentAdvisingNotes } from '@/dummyData/dummyData';

const StudentAdvisingNotes = () => {
  //fetch advising notes by student ID
  return (
    <div>
      <PageHeader headerText="Advising Notes" subtitle="Notes your advisors have shared with you. Open any note to see the full details and next steps." additionalClass="" />

      <div className="md:h-[65vh] overflow-y-scroll">
        <div className="flex flex-col gap-y-4">
          {dummyStudentAdvisingNotes.map((note, index)=> <AdvisingNotesCard key={index} note={note}/>)}
        </div>
      </div>
    </div>
  )
}

export default StudentAdvisingNotes