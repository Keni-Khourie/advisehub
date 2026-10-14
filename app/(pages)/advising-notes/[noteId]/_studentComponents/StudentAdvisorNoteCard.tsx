console.log("AdvisorNoteCard.tsx loaded");
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props{
   note:string | undefined
}
const StudentAdvisorNoteCard = ({note}:Props) => {
  return (
     <Card className={cn("bg-ahCardBlue border border-ahLightBlue w-full")}>
      <CardHeader className="flex items-center ">
        <Image src="/advisorNoteCardImage.png" alt="advisor note card image" width={500} height={500} className="w-20"/>
        <CardTitle className="text-base font-semibold">Advisor Note</CardTitle>
      </CardHeader>
      <CardContent className="">
        <p>{note}</p>
      </CardContent>
    </Card>
  )
}

export default StudentAdvisorNoteCard