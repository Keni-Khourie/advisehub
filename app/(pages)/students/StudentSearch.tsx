"use client"

import { Input } from "@/components/ui/input";
import PageHeader from "@/customUI/PageHeader";
import StudentCard from "./StudentCard";
import {dummyStudents} from "@/dummyData/dummyData"
const StudentSearch = () => {
  return (
    <div className="w-full">
        <PageHeader headerText="Find a Student" subtitle="Search profiles and advising history." additionalClass="mb-10"/>
        
        <div className="mb-10 flex flex-col gap-y-1 w-full">
            <p className="font-semibold tex-sm">Search by student name or ID</p>
            <Input type="text" placeholder="Enter student name or ID" className="bg-white rounded-md h-10"/>
        </div>

        <div className="flex flex-col gap-y-4 overflow-y-scroll h-[40vw]">
            {dummyStudents.map((student, index)=><StudentCard key={index} studentData={student}/>)}
        </div>
    </div>
  )
}

export default StudentSearch