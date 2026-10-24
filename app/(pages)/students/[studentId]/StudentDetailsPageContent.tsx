"use client";
import PageHeader from "@/customUI/PageHeader";
import CardAvatar from "@/customUI/CardAvatar";
import DegreeProgressCard from "./DegreeProgressCard"
import NextAppointmentCard from "./NextAppointmentCard"
import AdvisingNotes from "./AdvisingNotes"
import MeetingHistory from "./MeetingHistory"
import {useState} from "react"
import WhiteButton from "@/customUI/WhiteButton"
import {cn} from "@/lib/utils"
import Link from "next/link";
import BlueButton from "@/customUI/BlueButton";
import {useGetStudentByStudentIdQuery } from "@/redux/features/main/studentApiSlice";
import {Skeleton} from "@/components/ui/skeleton"
import FetchErrorMessage from "@/customUI/FetchErrorMessage"
interface Props {
  studentId: number;
}
const StudentDetailsPageContent = ({ studentId }: Props) => {
  //fetch student by studentId
  const [view, setView] = useState<"Advising Notes"|"Meeting History">("Advising Notes")
  const {data:student, isLoading, isError} = useGetStudentByStudentIdQuery(studentId)

  return (
    <div>
      <PageHeader
        headerText="Student Profile"
        subtitle="Student context before and after advising."
      /> 
      {isError && <div className="w-full flex justify-center mt-28">
        <FetchErrorMessage/></div>}
      {isLoading && <Skeleton className="h-60 w-full"/>}
      {student && (
        <div className="flex flex-col gap-y-5">
          <div className="flex items-center gap-x-3 mb-5">
            <CardAvatar fullName={student.fullName} additionalStyle="h-20 w-20" imageUrl={student.studentProfileImage} />
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold text-2xl">{student.fullName}</p>
              <p className="font-thin text-ahTextGrey text-sm">{`${student.degree} • ID ${student.studentId.toString().split("").toSpliced(0, 4, "*", "*", "*", "*").join("")}`}</p>
            </div>
          </div>
          <div className="flex gap-x-5 flex-wrap md:flex-nowrap w-full">
            <DegreeProgressCard percentComplete={student.degreePercentCompletion} completedCredits={student.completedCredits} remainingCredits={student.remainingCredits}/>
            <NextAppointmentCard nextAppointmentDate={student.nextAppointment}/>
          </div>
          <div className="flex items-center gap-y-3 justify-between flex-wrap md:flex-nowrap mt-3">
            <div className="flex items-center gap-x-5 gap-y-3 flex-wrap md:flex-nowrap">
              <WhiteButton text="Advising Notes" additionalStyle={cn("border", view==="Advising Notes" && "shadow-md")} onClick={()=>setView("Advising Notes")}/>
              <WhiteButton text="Meeting History" additionalStyle={cn("border", view==="Meeting History" && "shadow-md")} onClick={()=>setView("Meeting History")}/>
            </div>

              <Link href={`/advising-notes/student/${studentId}/create`}>
            <BlueButton additionalStyle="" text="+ Add Advising Note"/>
            </Link>
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
