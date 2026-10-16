"use client"
import PageHeader from '@/customUI/PageHeader';
import WhiteButton from '@/customUI/WhiteButton';
import {dummyAdvisorNotes} from "@/dummyData/dummyData"
import { truncateText } from '@/lib/utilityFunctions';
import {format} from "date-fns"
import Link from 'next/link';


const AdvisorAdvisingNotes = () => {
  //fetch advising notes by advisorId
  return (
    <div>
      <PageHeader headerText="Advising Notes" subtitle="View recent advising notes"/>

      <div className="flex flex-col gap-y-5 md:h-[70vh] overflow-y-scroll">
        {dummyAdvisorNotes.map((note, index)=>(
          <div key={index} className="rounded-lg border bg-white px-4 py-4 flex flex-col justify-center gap-y-3">
            <div className="flex flex-col gap-y-2">
              <p className=" text-base">{`${note.advisorFullName} • ${note.meetingReason} • ${format(note.meetingDateTime, "MMM d, yyyy")}`}</p>
              <p className="font-thin text-ahTextGrey text-sm">{`Student: ${note.studentFullName}`}</p>
            </div>
            <div className="">
              <p className="text-sm">{truncateText(note.note, 250)}</p>
            </div>
            <div className="w-full flex justify-center md:justify-end">
              <Link href={`/advising-notes/${note.id}`}>
              <WhiteButton text="View note" additionalStyle="border border-ahBorderBlue shadow-md"/>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdvisorAdvisingNotes