"use client";

import AdvisorAdvisingNotes from "./_advisorComponents/AdvisorAdvisingNotes";
import StudentAdvisingNotes from "./_studentComponents/StudentAdvisingNotes";

const AdvisingNotesContent = () => {
  //get from redux store
  const user = {
    role: "STUDENT",
  };
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
