import { StudentSearchResponseData } from "@/redux/features/main/studentApiSlice";
import WhiteButton from '@/customUI/WhiteButton';
import Link from "next/link"

import CardAvatar from "@/customUI/CardAvatar";

interface Props{
    studentData: StudentSearchResponseData
}

const StudentCard = ({studentData}:Props) => {

  return (
    <div className="border bg-white rounded-xl py-5 px-4 grid md:grid-cols-3 gap-y-2 grid-cols-1 items-center justify-between">
        <div className="flex items-center gap-x-3">
            <CardAvatar fullName={studentData.fullName}/>
            <div className="flex md:flex-col items-center md:items-start gap-x-5">
                <p className="font-semibold">{studentData.fullName}</p>
                <p className="font-thin text-ahTextGrey text-sm">{`${studentData.degree} • ID ${studentData.studentId.toString().split("").toSpliced(0, 4, "*", "*", "*", "*").join("")}`}</p>
            </div>
        </div>
        <p className="font-thin text-ahTextGrey text-sm  text-center">{`${studentData.completedCredits} completed • ${studentData.remainingCredits} remaining`}</p>

        <Link href={`/students/${studentData.studentId}`} className="flex md:justify-end justify-none">
            <WhiteButton text="View Profile" additionalStyle="border-2 border-ahGrey"/>
        </Link>
        
    </div>
  )
}

export default StudentCard