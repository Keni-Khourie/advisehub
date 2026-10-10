"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GreenButton from "@/customUI/GreenButton";
import GreenCheckOption from "@/customUI/GreenCheckOption";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PrepareForMeetingCard = () => {
  //add on click function for button
  return (
    <Card className={cn("bg-ahGrey rounded-sm")}>
      <CardHeader className="">
        <CardTitle className="font-semibold">Prepare for the Meeting</CardTitle>
        <CardDescription className="">Review student details before meeting</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col gap-y-3">
            <GreenCheckOption text="Degree progress available"/>
            <GreenCheckOption text="Advising notes centralized"/>
        </div>
        <div className="w-full flex justify-end">
            <Link href={"#"} className="w-1/4">
              <GreenButton text={"Open Student Profile"} additionalStyle="" />
            </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrepareForMeetingCard;
