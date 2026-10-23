import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import CardAvatar from "@/customUI/CardAvatar";
import { cn } from "@/lib/utils";
import {format} from "date-fns"
import{StudentNoteForStudent} from "@/redux/features/main/advisingNotesApiSlice"
interface Props{
    note:StudentNoteForStudent
}

const AdvisorDetails = ({note}:Props) => {
  return (
     <Card className={cn("border bg-white w-full pt-4 px-3 pb-15")}>
      {note && <CardContent className="flex items-start justify-between">
        <div className="flex items-center gap-x-5">
          <CardAvatar fullName={note.advisorFullName} additionalFallbackStyle="text-base" imageUrl={note.advisorProfileImage}/>
            <div className="flex flex-col gap-y-2">
                <p className="text-lg font-semibold">{note.title}</p>
                <p className="text-ahTextGrey">{`${note.advisorTitle} ${note.advisorFullName} • ${format(note.createdAt, "MMM d, yyyy")}`}</p>
            </div>
        </div>
        <Badge className={cn("py-2 px-5  text-center text-xs font-semibold opacity-60", note.isPrivate?"text-red-500 bg-red-100":"text-green-600 bg-green-200")}>{note.isPrivate?"private":"shared"}</Badge>
      </CardContent>}
      {!note && <CardContent>
            <p className="font-bold text-xl">Note note found</p>
            </CardContent>}
    </Card>
  )
}

export default AdvisorDetails