import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props{
  title:string;
  credits:number;
  fontStyling?:string
}

const DegreeCreditsCard = ({title, credits, fontStyling}:Props) => {
  return (
     <Card className={cn("border py-3 px-4 rounded-lg w-1/2 bg-white h-32 flex flex-col justify-center")}>
      <CardHeader className="flex gap-x-10 items-center">
        <CardTitle className={cn("font-bold text-3xl", fontStyling)}>{credits}</CardTitle>
        <CardDescription className="text-base font-semibold text-ahTextGrey">{title}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default DegreeCreditsCard