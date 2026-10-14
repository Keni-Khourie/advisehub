import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const AdvisorDetails = () => {
  return (
     <Card className={cn("border bg-white w-full")}>
      <CardHeader className="">
        <CardTitle className=""></CardTitle>
        <CardDescription className=""></CardDescription>
      </CardHeader>
      <CardContent className=""></CardContent>
    </Card>
  )
}

export default AdvisorDetails