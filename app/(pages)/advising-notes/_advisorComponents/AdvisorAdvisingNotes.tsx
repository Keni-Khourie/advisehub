"use client";
import PageHeader from "@/customUI/PageHeader";
import AdvisorNoteListCard from "./AdvisorNoteListCard";
import BlueButton from "@/customUI/BlueButton";
import Link from "next/link"
import {useGetPublicAdvisingNotesQuery, useGetAdvisorAdvisingNotesQuery, PublicAdvisorNote,
  PrivateAdvisorNote,} from "@/redux/features/main/advisingNotesApiSlice"
import {generateArray} from "@/lib/utilityFunctions"
import {Skeleton} from "@/components/ui/skeleton"
import {useState} from "react"
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Note = PublicAdvisorNote & PrivateAdvisorNote

const AdvisorAdvisingNotes = () => {
  //fetch advising notes by advisorId
  const [view, setView] = useState<"public"|"private">("public")
  const{data:publicAdvisingNotes, isLoading} =useGetPublicAdvisingNotesQuery()
  const{data:myAdvisingNotes, isLoading:myNotesLoading, isFetching} =useGetAdvisorAdvisingNotesQuery()
  console.log(myAdvisingNotes);
  console.log("isFetching", isFetching);
  return (
    <div>
      <PageHeader
        headerText="Advising Notes"
        subtitle="View recent advising notes"
      />
      <div className="w-full flex justify-between  mb-6">
        <div className="flex items-center gap-x-5">
          <Badge className={cn("px-3 bg-ahGrey text-ahTextGrey font-semibold text-center w-28 rounded-sm py-3.5 cursor-pointer", view==="public"&&"text-ahGreen")} onClick={()=>setView("public")}>Shared Notes</Badge>
          <Badge className={cn("px-3 bg-ahGrey text-ahTextGrey font-semibold text-center w-28 rounded-sm py-3.5 cursor-pointer", view==="private"&&"text-ahGreen")} onClick={()=>setView("private")}>My Notes</Badge>
        </div>
        <Link href="/advising-notes/create">
        <BlueButton text="+ Add Advising Note"/>
        </Link>
        
      </div>
      <div className="w-full">
        {view==="public" && (<div className="flex flex-col gap-y-5 md:h-[70vh] overflow-y-scroll">
        {(isLoading) && generateArray(6).map((item)=><Skeleton key={item} className="w-full h-20"/>)}

        {(publicAdvisingNotes && view==="public") && publicAdvisingNotes.map((note, index) => (
          <AdvisorNoteListCard note={note as Note} key={index} type="public" />
        ))}
        </div>)}
        
        {view=="private" && (<div className="flex flex-col gap-y-5 md:h-[70vh] overflow-y-scroll">
        {(myNotesLoading) && generateArray(6).map((item)=><Skeleton key={item} className="w-full h-20"/>)}
        {(myAdvisingNotes && view==="private") && myAdvisingNotes.map((note, index) => (
          <AdvisorNoteListCard note={note} key={index} type="private" />
        ))}
        {myAdvisingNotes && myAdvisingNotes.length==0 && <p className="w-full font-thin text-ahTextGrey text-center ">No notes yet</p>}
        </div>)}
        

        
      </div>
    </div>
  );
};

export default AdvisorAdvisingNotes;
