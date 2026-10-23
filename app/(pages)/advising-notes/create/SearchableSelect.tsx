
"use client";

import { Dispatch, useState, SetStateAction } from "react";
import { Check, } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useGetStudentsWithSearchFilterQuery, StudentSearchResponseData } from "@/redux/features/main/studentApiSlice";


interface Props{
  selectedStudent:StudentSearchResponseData |undefined
  setSelectedStudent:Dispatch<SetStateAction<StudentSearchResponseData |undefined>>
}
const SearchableSelect = ({selectedStudent, setSelectedStudent}:Props) =>{
  const [open, setOpen] = useState(false);
  const {data:students} = useGetStudentsWithSearchFilterQuery({search:""}, {refetchOnMountOrArgChange:true})


  // const selectedStudentJ = dummyStudents.find(
  //   (dummyStudent) => dummyStudent.id === selectedStudent?.studentId
  // );

  return (
   <Command className="bg-none w-full">
    <Popover open={open} >
        <PopoverTrigger>
            <CommandInput placeholder="Search students..." onKeyDown={()=>setOpen(true)} value={selectedStudent?`${selectedStudent.fullName}`:undefined} className=""/>
        </PopoverTrigger>
        <PopoverContent className="  w-(--anchor-width)">
            <CommandList className="w-full">
            <CommandEmpty>Student not found.</CommandEmpty>

           {students && <CommandGroup className="w-full ">
              {students.map((student, index) => (
                <CommandItem
                  key={index}
                  value={`${student.fullName}`}
                  className="w-full flex justify-between"
                  onSelect={() => {
                    setSelectedStudent(
                     selectedStudent?.studentId===student.studentId?undefined:student
                    )
                    
                    setOpen(false);
                  }}
                >
                  <p className="text-ahTextGrey">{student.fullName}</p>

                  <Check
                    className={cn(
                      "h-4 w-4",
                      selectedStudent?.studentId === student.studentId
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            }
          </CommandList>
        </PopoverContent>
    </Popover>
          

          
        </Command>
  );
}

export default SearchableSelect