"use client"

import AdvisorAdvisingNote from "./_advisorComponents/AdvisorAdvisingNote";
import StudentAdvisingNote from "./_studentComponents/StudentAdvisingNote";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";
interface Props{
    noteId:number
}

const AdvisingNoteContent = ({noteId}:Props) => {
    //get from redux store
  const user = useAppSelector((state: RootState) => state.user);

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