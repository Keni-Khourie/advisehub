"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CardAvatar from "@/customUI/CardAvatar";
import { AdvisorSpecialization } from "@/types/types";
import {Skeleton} from "@/components/ui/skeleton"
import FetchErrorMessage from "@/customUI/FetchErrorMessage"
interface Props{
  isLoading:boolean;
  isError:boolean;
  cardData:{
    advisorName:string;
    advisorTitle:string;
    advisorEmail:string;
    advisorSpecialization:AdvisorSpecialization;
    advisorProfileImage:string|undefined
  }|undefined
}

const AdvisorDetailsCard = ({isLoading, isError, cardData}:Props) => {
  return (
     <Card className={cn("border rounded-lg bg-white w-full md:w-2/3 pb-10")}>
     
      <CardHeader className="">
      {isLoading && <Skeleton className="h-12 w-3/4"/>}
      {cardData && <>
        <CardTitle className="font-semibold">{`${cardData.advisorTitle} ${cardData.advisorName}`}</CardTitle>
        <CardDescription className="">{cardData.advisorEmail}</CardDescription></>}
      </CardHeader>
      <CardContent className="">
        {isError && !cardData && (<div className="flex flex-col w-full h-full justify-center items-center font-thin text-center text-sm text-ahTextGrey"><FetchErrorMessage/></div>)}
        {isLoading && (<div className="flex items-center gap-x-3">
          <Skeleton className="h-15 w-15 rounded-full"/>
          <Skeleton className="h-15 w-3/4"/>
        </div>)}
       {cardData && <div className="flex items-center gap-x-3">
          <CardAvatar fullName={cardData.advisorName} additionalStyle="w-15 h-15" imageUrl={cardData.advisorProfileImage}/>
            <div>
                <Badge className="text-ahGreen px-3 py-1 bg-ahGrey rounded-sm">{cardData.advisorSpecialization}</Badge>
            </div>
        </div>}
      </CardContent>
    </Card>
  )
}

export default AdvisorDetailsCard