"use client"

import AdvisorAdvisingNote from "./_advisorComponents/AdvisorAdvisingNote";
import StudentAdvisingNote from "./_studentComponents/StudentAdvisingNote";

interface Props{
    noteId:number
}

const AdvisingNoteContent = ({noteId}:Props) => {
    //get from redux store
  const user = {
    role: "ADVISOR",
  };

  return (
    <div>
        {user.role === "STUDENT" ? (
        <StudentAdvisingNote noteId={noteId}/>
      ) : user.role === "ADVISOR" ? (
        <AdvisorAdvisingNote noteId={noteId}/>
      ) : (
        <></>
      )}
        
        
    </div>
  )
}

export default AdvisingNoteContent