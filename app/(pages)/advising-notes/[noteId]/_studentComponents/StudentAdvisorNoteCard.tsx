console.log("AdvisorNoteCard.tsx loaded");
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props{
   note:string | undefined
}
const StudentAdvisorNoteCard = ({note}:Props) => {
  return (
     <Card className={cn("bg-ahCardBlue border border-ahLightBlue w-full h-full md:h-40")}>
      
        
        
      
      <CardContent className="flex items-start">
      <div className="mt-[-10]">
        <Image src="/advisorNoteCardImage.png" alt="advisor note card image" width={500} height={500} className="w-28"/>
      </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-semibold text-base">Advisor note</p>
          <p>{note}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StudentAdvisorNoteCard