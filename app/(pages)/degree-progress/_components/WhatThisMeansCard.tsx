import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GreenCheckOption from "@/customUI/GreenCheckOption";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  completedCredits: number;
  remainingCredits: number;
}
const WhatThisMeansCard = ({ completedCredits, remainingCredits }: Props) => {
  const bulletPoints: string[] = [
    `You have completed ${completedCredits} credits.`,
    `${remainingCredits} credits remain before the ${completedCredits + remainingCredits}-credit total.`,
    `Use advising to plan the remaining credits.`,
  ];
  return (
    <Card className={cn("bg-white border w-full md:w-1/2")}>
      <CardHeader className="">
        <CardTitle className="font-semibold text-xl">What this means</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex">
        <div className=" w-full flex flex-col gap-y-2 justify-center z-10">
          {bulletPoints.map((point, index) => (
            <GreenCheckOption key={index} text={point} />
          ))}
        </div>
        <div className=" w-full flex justify-center md:justify-end z-0">
          <Image
            src="/whatThisMeansImage.png"
            alt="What this means card image"
            width={500}
            height={100}
            className="w-44"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatThisMeansCard;
