"use client";
import PageHeader from "@/customUI/PageHeader";
import AdvisingNotesCard from "./AdvisingNotesCard";
import { useGetStudentAdvisingNotesForStudentQuery } from "@/redux/features/main/advisingNotesApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { generateArray } from "@/lib/utilityFunctions";
import FetchErrorMessage from "@/customUI/FetchErrorMessage";

const StudentAdvisingNotes = () => {
  //fetch advising notes by student ID
  const {
    data: advisingNotes,
    isLoading,
    isError,
  } = useGetStudentAdvisingNotesForStudentQuery();
  return (
    <div>
      <PageHeader
        headerText="Advising Notes"
        subtitle="Notes your advisors have shared with you. Open any note to see the full details and next steps."
        additionalClass=""
      />

      <div className="md:h-[65vh] overflow-y-scroll">
        <div className="flex flex-col gap-y-4">
          {isLoading &&
            generateArray(4).map((item) => (
              <Skeleton key={item} className="h-40 w-full" />
            ))}
          {advisingNotes &&
            advisingNotes.map((note, index) => (
              <AdvisingNotesCard key={index} note={note} />
            ))}
          {isError && <FetchErrorMessage />}
        </div>
      </div>
    </div>
  );
};

export default StudentAdvisingNotes;
