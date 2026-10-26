"use client"
import {format} from "date-fns"
import {useGetNotesAboutStudentByAdvisorForAdvisorQuery} from "@/redux/features/main/advisingNotesApiSlice"
import {Skeleton} from "@/components/ui/skeleton"
import {generateArray, truncateText} from "@/lib/utilityFunctions"
import FetchErrorMessage from "@/customUI/FetchErrorMessage"
import Link from "next/link"
import WhiteButton from "@/customUI/WhiteButton"
import {Badge} from "@/components/ui/badge"
import {cn} from "@/lib/utils"

interface Props{
    studentId:number
}
const AdvisingNotes = ({studentId}:Props) => {
    //data here should be sorted from earliest to farthest
   const {data:notes, isLoading, isError} =useGetNotesAboutStudentByAdvisorForAdvisorQuery(studentId)
  return (
    <div className="flex flex-col gap-y-4 w-full">
        {isError && <FetchErrorMessage/>}
        {isLoading && generateArray(6).map((item)=><Skeleton key={item} className="h-10 w-full"/>)}
        {notes && notes.length==0 && <p className="font-thin text-sm text-ahTextGrey">No previous appointment with student</p>}
        {notes && notes.map((note, index)=>(
            <div key={index} className="rounded-lg bg-white border pt-3 py-6 px-3 flex flex-col gap-y-2">
                <p className="font-semibold text-sm">{`${index===0?"Latest note": note.title } • ${format(new Date(), "MMM d, yyyy")}`}</p>
                <div className="flex justify-between items-center md:flex-nowrap flex-wrap gap-y-3">
                    <div className="flex flex-col gap-y-2">
                        <p className="font-thin text-sm text-ahTextGrey">{truncateText(note.content, 100)}</p>
                        <Badge className={cn("px-3 py-1 opacity-60 font-semibold", note.isPrivate?"bg-red-200 text-red-500":"bg-green-200 text-green-500")}>
                            {note.isPrivate?"Private":"Shared"}
                        </Badge>
                    </div>

                    <Link href={`/advising-notes/${note.id}`} className="">
                    <WhiteButton text="View note" additionalStyle="border border-stone-200"/>
                    </Link>
                </div>
                

            </div>
        ))}

    </div>
  )
}

export default AdvisingNotes