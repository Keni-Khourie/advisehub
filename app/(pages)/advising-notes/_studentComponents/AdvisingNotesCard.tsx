import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {truncateText } from "@/lib/utilityFunctions";
import {format} from "date-fns"
import { DummyStudentAdvisingNote } from "@/dummyData/dummyTypes";
import CardAvatar from "@/customUI/CardAvatar";
//import { Skeleton } from '@/components/ui/skeleton';

interface Props{
    //replace with actual data's type
    note:DummyStudentAdvisingNote
}

const AdvisingNotesCard = ({note}:Props) => {
    const noteTextLimit:number = 250 //create logic to alter this based on screen width.
  return (
     <Card className={cn("bg-white w-full h-full border px-3 pt-4 pb-12")}>
      <CardContent className="w-full h-full flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
            <CardAvatar fullName={note.advisor}/>
            <div className="flex flex-col gap-y-2 w-[90%]">
                <p className="text-base font-semibold">{`Graduation planning follow-up`}</p>
                <p className="font-thin text-sm text-ahTextGrey">{`${note.advisorTitle} ${note.advisor} • ${format(note.meetingDate, "MMM d, yyyy")}`}</p>
                <p className="mt-2 text-sm ">{`${truncateText(note.note, noteTextLimit)}`}</p>
            </div>
        </div>
        <div>
            <Link href={`/advising-notes/${note.id}`}>
            <Badge className="bg-ahCardBlue text-ahDeepBlue hover:text-ahHoverDeepBlue px-2 py-1 text-xs cursor-pointer font-semibold">Open note →</Badge>
            </Link>
            
        </div>
      </CardContent>
    </Card>
  )
}

export default AdvisingNotesCard