import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlueButton from "@/customUI/BlueButton";
import { cn } from "@/lib/utils";
import Link from "next/link";

const RecommendedNextStepsCard = () => {
  return (
    <Card className={cn("bg-white border w-full md:w-1/2")}>
      <CardHeader className="">
        <CardTitle className="font-semibold text-xl">
          Recommended next steps
        </CardTitle>
        <CardDescription className="">
          Review the remaining credits with an advisor before registration and
          keep your plan up to date.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex items-center gap-x-2">
        <Link href="/appointments/schedule-appointment" className="w-[70%]">
          <BlueButton
            text="Schedule degree-planning appointment"
            additionalStyle="w-full h-10"
          />
        </Link>
        <Link href="/advising-notes" className="w-[30%]">
          <Button className="border border-ahGrey bg-white hover:bg-stone-100 text-ahTextBlack w-full h-10 shadow-sm cursor-pointer">
            View advising notes
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RecommendedNextStepsCard;
