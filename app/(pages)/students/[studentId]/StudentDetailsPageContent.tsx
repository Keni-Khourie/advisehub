"use client";
import PageHeader from "@/customUI/PageHeader";
import { dummyStudents } from "@/dummyData/dummyData";
import CardAvatar from "@/customUI/CardAvatar";
import DegreeProgressCard from "./DegreeProgressCard"
import NextAppointmentCard from "./NextAppointmentCard"
import AdvisingNotes from "./AdvisingNotes"
import MeetingHistory from "./MeetingHistory"
import {useState} from "react"
import WhiteButton from "@/customUI/WhiteButton"
import {cn} from "@/lib/utils"
interface Props {
  studentId: number;
}
const StudentDetailsPageContent = ({ studentId }: Props) => {
  //fetch student by studentId
  const [view, setView] = useState<"Advising Notes"|"Meeting History">("Advising Notes")
  const student = dummyStudents.find(
    (student) => student.studentId === studentId,
  );
  return (
    <div>
      <PageHeader
        headerText="Student Profile"
        subtitle="Student context before and after advising."
      />
      {student && (
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center gap-x-3 mb-5">
            <CardAvatar fullName={student.fullName} additionalStyle="h-20 w-20" />
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold text-2xl">{student.fullName}</p>
              <p className="font-thin text-ahTextGrey text-sm">{`${student.degree} • ID ${student.studentId.toString().split("").toSpliced(0, 4, "*", "*", "*", "*").join("")}`}</p>
            </div>
          </div>
          <div className="flex gap-x-5 flex-wrap md:flex-nowrap w-full">
            <DegreeProgressCard percentComplete={student.degreeCompletionPercent} completedCredits={student.completedCredits} remainingCredits={student.remainingCredits}/>
            <NextAppointmentCard/>
          </div>
          <div className="flex items-center gap-x-5  flex-wrap md:flex-nowrap">
            <WhiteButton text="Advising Notes" additionalStyle={cn("border", view==="Advising Notes" && "shadow-md")} onClick={()=>setView("Advising Notes")}/>
            <WhiteButton text="Meeting History" additionalStyle={cn("border", view==="Meeting History" && "shadow-md")} onClick={()=>setView("Meeting History")}/>
          </div>
          <div className="md:h-[30vh] overflow-y-scroll">
            {view==="Advising Notes" && (<AdvisingNotes/>)}
            {view==="Meeting History" && (<MeetingHistory/>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetailsPageContent;
