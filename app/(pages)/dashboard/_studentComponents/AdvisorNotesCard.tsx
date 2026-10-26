import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlueButton from "@/customUI/BlueButton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {Skeleton} from "@/components/ui/skeleton"

interface Props{
  data:number|undefined,
  isLoading:boolean;
  isError:boolean;
}

const AdvisorNotesCard = ({data, isLoading, isError}:Props) => {
  return (
     <Card className={cn("w-full md:w-[35%] rounded-md p-4 bg-white")}>
      <CardHeader className="">
        <CardTitle className="text-ahTextBlack font-semibold text-base">Advisor Notes</CardTitle>
        
      </CardHeader>
      <CardContent className="flex items-center w-full">
        <div className="w-1/3">
            {data!==undefined && <p className="text-ahGreen font-bold text-2xl">{`${data} unread notes`}</p>}
            {isLoading && <Skeleton className="w-5 h-8"/>}
            {isError && !data &&  <p className="text-ahGreen font-bold text-2xl">{`- unread notes`}</p>}
            {/* <p>{`Latest from ${"Jordan Lee"}`}</p> */}
        </div>
        <div className="w-[60%] flex flex-col justify-center">
            <Image src="/advisorNotesCardImage.png" alt="advisor notes card image" width={500} height={500} className=""/>
            <Link href={`/advising-notes`}>
            <BlueButton text="Open Advising Note" additionalStyle="rounded-xl py-1 h-6 text-sm" />
                </Link>
        </div>
        
      </CardContent>
      
    </Card>
  )
}

export default AdvisorNotesCard