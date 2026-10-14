import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlueButton from "@/customUI/BlueButton";
import { cn } from "@/lib/utils";

const RelatedInformationCard = () => {
  return (
     <Card className={cn("w-full md:w-1/2 px-3 pt-3 pb-1")}>
      <CardHeader className="">
        <CardTitle className="text-base font-semibold">Related Information</CardTitle>
        <CardDescription className="text-ahTextGrey font-light text-sm">{`Degree Progress: ${94} completed • ${26} remaining`}</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <BlueButton text="Schedule Follow-up" additionalStyle="w-full md:w-[50%]"/>
      </CardContent>
    </Card>
  )
}

export default RelatedInformationCard