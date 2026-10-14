import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GreenCheckOption from "@/customUI/GreenCheckOption";
import { cn } from "@/lib/utils";

interface Props{
  steps:string[]|undefined
}
const NextStepsCard = ({steps}:Props) => {
  return (
     <Card className={cn("w-full md:w-1/2")}>
      <CardHeader className="">
        <CardTitle className="text-base font-semibold">Next Steps</CardTitle>
        <CardDescription className=""></CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        {!steps && <p className="text-sm font-thin text-ahTextGrey">No next steps</p>}
        {steps && (
          <div className="flex flex-col gap-y-2">
            {steps.map((step, index)=><GreenCheckOption key={index} text={step}/>)}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default NextStepsCard