import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlueButton from "@/customUI/BlueButton";
import WhiteButton from "@/customUI/WhiteButton"
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props{
    studentId:number|undefined
}
const AdvisorRelatedInformation = ({studentId}:Props) => {
  return (
     <Card className={cn("w-full h-full md:w-1/2 px-3 py-3")}>
      <CardHeader className="">
        <CardTitle className="text-base font-semibold">Related Information</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-y-2">
        <p className="text-ahTextGrey font-light text-sm">{`Student Degree: ${"BSc. Computer Science"}`}</p>
        <p className="text-ahTextGrey font-light text-sm">{`Student Degree Progress: ${94} completed • ${26} remaining`}</p>
        <div className="flex items-center gap-x-3 gap-y-3 flex-nowrap w-full">
            <Link href={studentId?`/advising-notes/student/${studentId}/create`:"/students"}className="w-full md:w-1/2">
            <BlueButton text="+ Add Note" additionalStyle="w-full" disabled={!studentId}/></Link>

            <Link href={studentId?`/students/${studentId}`:"/students"}className="w-full md:w-1/2">
            <WhiteButton text="View Student Details" additionalStyle="md:w-full border border-ahGrey shadow-sm" disabled={!studentId}/></Link>
        </div>
        
      </CardContent>
    </Card>
  )
}

export default AdvisorRelatedInformation