import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import CardAvatar from "@/customUI/CardAvatar";
import { cn } from "@/lib/utils";
import {format} from "date-fns"
interface Props{
    advisor:string;
    advisorTitle:string;
    date:string;
    noteTitle:string
}

const AdvisorDetails = ({advisorTitle, advisor, date, noteTitle}:Props) => {
  return (
     <Card className={cn("border bg-white w-full pt-4 px-3 pb-15")}>
      <CardContent className=" flex items-start justify-between">
        <div className="flex items-center gap-x-5">
          <CardAvatar fullName={advisor} additionalFallbackStyle="text-base"/>
            <div className="flex flex-col gap-y-2">
                <p className="text-lg font-semibold">{noteTitle}</p>
                <p className="text-ahTextGrey">{`${advisorTitle} ${advisor} • ${format(date, "MMM d, yyyy")}`}</p>
            </div>
        </div>
        <Badge className="py-2 px-5 text-green-600 bg-green-200 text-center text-xs font-semibold">Shared with you</Badge>
      </CardContent>
    </Card>
  )
}

export default AdvisorDetails