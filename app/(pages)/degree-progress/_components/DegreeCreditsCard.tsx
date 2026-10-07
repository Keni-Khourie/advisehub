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
  subtitle:string;
  credits:number;
}

const DegreeCreditsCard = ({title, subtitle, credits}:Props) => {
  return (
     <Card className={cn("border py-2 px-3 rounded-sm w-1/2")}>
      <CardHeader className="">
        <CardTitle className="font-semibold text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="pb-10">
        <p className="font-bold text-3xl">{`${credits} credits`}</p>
      </CardContent>

    </Card>
  )
}

export default DegreeCreditsCard