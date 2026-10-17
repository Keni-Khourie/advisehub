"use client"
import PageHeader from "@/customUI/PageHeader"
import SearchableSelect from "./SearchableSelect"
import CreateAdvisingNoteForm from "./CreateAdvisingNoteForm";
import { useState } from "react";

const CreateAdvisingNoteContent = () => {
  const [studentId, setStudentId] =useState<number|undefined>(undefined)
  return (
    <div className="w-full">
        <PageHeader headerText="Add Advising Note" subtitle="Create Note and choose visibility"/>

        <SearchableSelect/>
        <CreateAdvisingNoteForm studentId={studentId}/>
        
    </div>
  )
}

export default CreateAdvisingNoteContent