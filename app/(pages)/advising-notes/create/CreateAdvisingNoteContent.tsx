"use client"
import PageHeader from "@/customUI/PageHeader"
import SearchableSelect from "./SearchableSelect"
import CreateAdvisingNoteForm from "./CreateAdvisingNoteForm";
import { useState } from "react";
import {DummyStudent} from "@/dummyData/dummyTypes"

const CreateAdvisingNoteContent = () => {
  const [student, setStudent] =useState<DummyStudent|undefined>(undefined)
  return (
    <div className="w-full">
        <PageHeader headerText="Add Advising Note" subtitle="Create Note and choose visibility" additionalClass="mb-10"/>
          <p>{student?.studentId}</p>
        <SearchableSelect selectedStudent={student} setSelectedStudent={setStudent}/>
        <div className="mt-4">
          <CreateAdvisingNoteForm studentId={student?.studentId}/>
        </div>
        
    </div>
  )
}

export default CreateAdvisingNoteContent