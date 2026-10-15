import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SearchStudentsCard = () => {
  return (
     <Card className={cn("bg-white rounded-lg pt-4 px-3 py-3 border w-full md:w-1/3")}>
      <CardHeader className="">
        <CardTitle className="font-semibold text-base">Students</CardTitle>
        <CardDescription className="font-thin text-ahTextGrey">Find a student profile, progress, meetings, and notes.</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Link href="/students">
        <p className="cursor-pointer text-sm text-ahTextPurple hover:underline font-semibold">Search Students</p>
        </Link>
      </CardContent>
    </Card>
  )
}

export default SearchStudentsCard