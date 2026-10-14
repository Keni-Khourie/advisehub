import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getInitials } from "@/lib/utilityFunctions";
import {format} from "date-fns"
//import { Skeleton } from '@/components/ui/skeleton';

const AdvisingNotesCard = () => {
  return (
     <Card className={cn("bg-white w-full h-full border px-3 pt-3 pb-8")}>
      <CardContent className="w-full h-full flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
            <Avatar className="h-12 w-12">
                <AvatarImage src={undefined}/>
                <AvatarFallback className="text-white font-semibold bg-ahGreen text-lg">JJ</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-y-2">
                <p className="text-base font-semibold">{`Graduation planning follow-up`}</p>
                <p className="font-thin text-sm text-ahTextGrey">{`Jordan Lee • Mar 1, 2026`}</p>
                <p className="mt-2 text-sm font-semibold">{`You are on track. Please complete the remaining 26 credits and meet again before registration.`}</p>
            </div>
        </div>
        <div>
            <Link href="#">
            <Badge className="bg-ahCardBlue text-ahDeepBlue hover:text-ahHoverDeepBlue px-2 py-1 text-xs cursor-pointer font-semibold">Open note →</Badge>
            </Link>
            
        </div>
      </CardContent>
    </Card>
  )
}

export default AdvisingNotesCard