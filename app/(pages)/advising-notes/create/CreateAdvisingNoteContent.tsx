"use client"
import PageHeader from "@/customUI/PageHeader"
import SearchableSelect from "./SearchableSelect"
import CreateAdvisingNoteForm from "./CreateAdvisingNoteForm";
import { useState } from "react";
import {StudentSearchResponseData} from "@/redux/features/main/studentApiSlice"
const CreateAdvisingNoteContent = () => {
  const [student, setStudent] =useState<StudentSearchResponseData|undefined >(undefined)
  return (
    <div className="w-full">
        <PageHeader headerText="Add Advising Note" subtitle="Create Note and choose visibility" additionalClass="mb-10"/>
          
        <SearchableSelect selectedStudent={student} setSelectedStudent={setStudent}/>
        <div className="mt-4">
          <CreateAdvisingNoteForm studentId={student?.studentId}/>
        </div>
        
    </div>
  )
}

export default CreateAdvisingNoteContent