"use client"
import { Input } from "@/components/ui/input";
import PageHeader from "@/customUI/PageHeader";
import StudentCard from "./StudentCard";
import { useState, ChangeEvent } from "react";
import { useGetStudentsWithSearchFilterQuery } from "@/redux/features/main/studentApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { generateArray } from "@/lib/utilityFunctions";
import FetchErrorMessage from "@/customUI/FetchErrorMessage";
const StudentSearch = () => {
    const [inputValue, setInputValue] = useState<string>("")
    const updateSearch = (e:ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value)

    }
   
    const {data:students, isLoading, isError} = useGetStudentsWithSearchFilterQuery({search:inputValue},{ refetchOnMountOrArgChange: true })
    console.log(students);
  return (
    <div className="w-full">
        
        <PageHeader headerText="Find a Student" subtitle="Search profiles and advising history." additionalClass="mb-10"/>
        
        <div className="mb-10 flex flex-col gap-y-1 w-full">
            <p className="font-semibold text-sm">Search by student name or ID</p>
            <Input type="text" placeholder="Enter student name or ID" className="bg-white rounded-md h-10" onChange={updateSearch}/>
        </div>

        <div className="flex flex-col gap-y-4 overflow-y-scroll md:h-[65vh] h-140">
           {isLoading && generateArray(5).map((item)=>(<Skeleton key={item} className="h-20 w-full"/>))  }
           {isError &&!students && <FetchErrorMessage/>}
           
            {students && students.map((student, index)=><StudentCard key={index} studentData={student}/>)}
        </div>
    </div>
  )
}

export default StudentSearch