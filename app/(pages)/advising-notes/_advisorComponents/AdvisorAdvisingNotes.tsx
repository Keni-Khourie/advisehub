"use client";
import PageHeader from "@/customUI/PageHeader";
import AdvisorNoteListCard from "./AdvisorNoteListCard";
import { dummyAdvisorNotes } from "@/dummyData/dummyData";
import BlueButton from "@/customUI/BlueButton";
import Link from "next/link";

const AdvisorAdvisingNotes = () => {
  //fetch advising notes by advisorId
  return (
    <div>
      <PageHeader
        headerText="Advising Notes"
        subtitle="View recent advising notes"
      />
      <div className="w-full flex justify-center md:justify-end mb-4">
        <Link href="/advising-notes/create">
        <BlueButton text="+ Add Advising Note"/>
        </Link>
        
      </div>
      <div className="flex flex-col gap-y-5 md:h-[70vh] overflow-y-scroll">
        {dummyAdvisorNotes.map((note, index) => (
          <AdvisorNoteListCard note={note} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AdvisorAdvisingNotes;
