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
    studentName:string;
    studentDegree:string;
    studentId:string;
    studentEmail:string;
    advisorSpecialization:AdvisorSpecialization;
    studentProfileImage:string|undefined
  }|undefined
}

const StudentDetailsCard = ({isLoading, isError, cardData}:Props) => {
  return (
     <Card className={cn("border rounded-lg bg-white w-full md:w-2/3 pb-10")}>
     
      <CardHeader className="">
        {isLoading && <Skeleton className="h-12 w-3/4"/>}
       {cardData && <><CardTitle className="font-semibold">{cardData.studentName}</CardTitle>
        <CardDescription className="">{cardData.studentDegree}</CardDescription>
        </>}
        
      </CardHeader>
      <CardContent className="">
        {isError && !cardData && (<div className="flex flex-col w-full h-full justify-center items-center font-thin text-center text-sm text-ahTextGrey"><FetchErrorMessage/></div>)}
        {isLoading && (<div className="flex items-center gap-x-3">
          <Skeleton className="h-15 w-15 rounded-full"/>
          <Skeleton className="h-15 w-3/4"/>
        </div>)}
       {cardData && <div className="flex items-center gap-x-3">
          <CardAvatar fullName={cardData.studentName} additionalStyle="w-15 h-15" imageUrl={cardData.studentProfileImage}/>
            <div>
                <p className="text-thin text-ahTextGrey">{`Student ID ${cardData.studentId.split("").toSpliced(0, 4, "*", "*", "*", "*").join("")}`}</p>
                <Badge className="text-ahGreen px-3 py-1 bg-ahGrey rounded-sm">{cardData.advisorSpecialization}</Badge>
            </div>
        </div>}
      </CardContent>
    </Card>
  )
}

export default StudentDetailsCard