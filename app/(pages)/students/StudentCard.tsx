import {DummyStudent } from "@/dummyData/dummyTypes";
import WhiteButton from '@/customUI/WhiteButton';
import Link from "next/link"

import CardAvatar from "@/customUI/CardAvatar";

interface Props{
    studentData: DummyStudent
}

const StudentCard = ({studentData}:Props) => {

  return (
    <div className="border bg-white rounded-lg py-3 px-3">
        <div className="flex items-center gap-x-3">
            <CardAvatar fullName={studentData.fullName}/>
            <div>
                <p className="font-semibold">{studentData.fullName}</p>
                <p className="font-thin text-ahTextGrey text-sm">{`${studentData.degree} • ID ${studentData.studentId.toString().split("").toSpliced(0, 4, "*", "*", "*", "*").join("")}`}</p>
            </div>
        </div>
        <p className="font-thin text-ahTextGrey text-sm">{`${studentData.completedCredits} completed • ${studentData.remainingCredits} remaining`}</p>

        <Link href={`/students/${studentData.studentId}`}>
            <WhiteButton text="View Profile"/>
        </Link>
        
    </div>
  )
}

export default StudentCard