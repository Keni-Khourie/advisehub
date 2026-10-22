"use client";

import AdvisorAdvisingNotes from "./_advisorComponents/AdvisorAdvisingNotes";
import StudentAdvisingNotes from "./_studentComponents/StudentAdvisingNotes";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";
const AdvisingNotesContent = () => {
  //get from redux store
  const user = useAppSelector((state: RootState) => state.user);
  return (
    <div>
      {user.role === "STUDENT" ? (
        <StudentAdvisingNotes />
      ) : user.role === "ADVISOR" ? (
        <AdvisorAdvisingNotes />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdvisingNotesContent;
