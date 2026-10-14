"use client"
import PageHeader from '@/customUI/PageHeader';
import React from 'react'
import AdvisingNotesCard from './AdvisingNotesCard';

const StudentAdvisingNotes = () => {
  //fetch advising notes by student ID
  return (
    <div>
      <PageHeader headerText="Advising Notes" subtitle="Notes your advisors have shared with you. Open any note to see the full details and next steps." additionalClass="" />

      <div className="md:h-[40vw] overflow-y-scroll">
        <div className="flex flex-col gap-y-4">
          <AdvisingNotesCard/>
          <AdvisingNotesCard/>
          <AdvisingNotesCard/>
          <AdvisingNotesCard/>
          <AdvisingNotesCard/>
          <AdvisingNotesCard/>
          <AdvisingNotesCard/>
        </div>
      </div>
    </div>
  )
}

export default StudentAdvisingNotes