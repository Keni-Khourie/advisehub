import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { truncateText } from "@/lib/utilityFunctions";
import { format } from "date-fns";
import CardAvatar from "@/customUI/CardAvatar";
import { StudentNoteForStudent } from "@/redux/features/main/advisingNotesApiSlice";

interface Props {
  //replace with actual data's type
  note: StudentNoteForStudent;
}

const AdvisingNotesCard = ({ note }: Props) => {
  const noteTextLimit: number = 250; //create logic to alter this based on screen width.
  return (
    <Card className={cn("bg-white w-full h-full border px-3 pt-4 pb-12")}>
      <CardContent className="w-full h-full flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <CardAvatar fullName={note.advisorFullName} />
          <div className="flex flex-col gap-y-2 w-[90%]">
            <p className="text-base font-semibold">{note.title}</p>
            <p className="font-thin text-sm text-ahTextGrey">{`${note.advisorTitle} ${note.advisorFullName} • ${format(note.createdAt, "MMM d, yyyy")}`}</p>
            <p className="mt-2 text-sm ">{`${truncateText(note.content, noteTextLimit)}`}</p>
          </div>
        </div>
        <div>
          <Link href={`/advising-notes/${note.id}`}>
            <Badge className="bg-ahCardBlue text-ahDeepBlue hover:text-ahHoverDeepBlue px-2 py-1 text-xs cursor-pointer font-semibold">
              Open note →
            </Badge>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvisingNotesCard;
