import WhiteButton from "@/customUI/WhiteButton";

import Link from "next/link";
import {format} from "date-fns"
import {StudentNoteForAdvisor} from "@/redux/features/main/advisingNotesApiSlice"
interface Props{
    note:StudentNoteForAdvisor
}

const StudentNotesListCard = ({note}:Props) => {
  return (
    <div className="bg-white border px-4 pt-4 pb-6 gap-y-2 flex justify-between flex-wrap md:flex-nowrap rounded-lg">
        <div className="flex flex-col gap-y-2">
            <p className="text-base font-semibold">{`${format(note.createdAt, "MMM d, yyyy")} • ${note.advisorFullName}`}</p>
            <p className="font-thin text-sm text-ahTextGrey">{note.title}</p>
        </div>
        
            <Link href={`/advising-notes/${note.id}`}>
            <WhiteButton text="View note" additionalStyle="shadow-sm"/></Link>
            
        
        
    </div>
  )
}

export default StudentNotesListCard