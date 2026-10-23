import {
  Card,
  CardContent,
} from "@/components/ui/card";
import CardAvatar from "@/customUI/CardAvatar";
import { cn } from "@/lib/utils";
import {format} from "date-fns"
import {PrivateAdvisorNote} from "@/redux/features/main/advisingNotesApiSlice"
interface Props{
    note:PrivateAdvisorNote
}
const StudentDetails = ({note}:Props) => {
  return (
    <Card className={cn("border bg-white w-full pt-4 px-3 pb-8")}>
       {note && <CardContent>
             <div className="flex items-center gap-x-5">
          <CardAvatar fullName={note.studentFullName} additionalStyle="h-15 w-15" additionalFallbackStyle="text-base font-semibold"/>
            <div className="flex flex-col gap-y-2">
                <p className="text-lg font-semibold">{note.studentFullName}</p>
                <p className="text-ahTextGrey">{`Advisor:${note.advisorFullName}`}</p>
                <p 
                className="font-thin text-sm text-ahTextGrey">{`${note.advisorSpecialization} • ${format(note.createdAt, "MMM d, yyyy")}`}</p>
            </div>
        </div>
        </CardContent>}
        {!note && <CardContent>
            <p className="font-bold text-xl">Note note found</p>
            </CardContent>}
    </Card>
  )
}

export default StudentDetails