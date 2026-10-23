import WhiteButton from "@/customUI/WhiteButton";
import { truncateText } from "@/lib/utilityFunctions";
import { format } from "date-fns";
import Link from "next/link";
import {
  PublicAdvisorNote,
  PrivateAdvisorNote,
} from "@/redux/features/main/advisingNotesApiSlice";
import {Badge} from "@/components/ui/badge"
import {cn} from "@/lib/utils"

type Note = PublicAdvisorNote & PrivateAdvisorNote
interface Props {
  note: Note
  type: "public" | "private";
}

const AdvisorNoteListCard = ({ note, type }: Props) => {
  return (
    <div className="rounded-lg border bg-white px-4 py-4 flex flex-col justify-center gap-y-3">
      {type === "public" && (
        <div className="flex flex-col gap-y-2">
          <p className=" text-base">{`${note.advisorFullName} • ${note.advisorSpecialization} • ${format(note.createdAt, "MMM d, yyyy")}`}</p>
          <p className="font-thin text-ahTextGrey text-sm">{`Student: ${note.studentFullName}`}</p>
        </div>
      )}
      {type === "private" && (
        <div className="flex items-center justify-between">
          <p className=" text-base">{`${note.studentFullName} • ${note.advisorSpecialization} • ${format(note.createdAt, "MMM d, yyyy")}`}</p>
          <Badge className={cn("px-5 py-2 font-semibold opacity-60", note.isPrivate?"bg-red-100 text-red-500":"bg-green-200 text-green-600")}>{note.isPrivate?"private":"shared"}</Badge>
        </div>
      )}
      <div className="">
        <p className="text-sm">{truncateText(note.content, 250)}</p>
      </div>
      <div className="w-full flex justify-center md:justify-end">
        <Link href={`/advising-notes/${note.id}`}>
          <WhiteButton
            text="View note"
            additionalStyle="border border-ahBorderBlue shadow-md"
          />
        </Link>
      </div>
    </div>
  );
};

export default AdvisorNoteListCard;
