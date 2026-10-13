import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from '@/lib/utils';
import Image from "next/image";

//interface Props {}
const DegreeProgressCard = () => {
  return (
    <Card className={cn("w-full md:w-[35%] rounded-md p-4 bg-white")}>
        <CardHeader className="">
            <CardTitle className="text-ahTextBlack font-semibold text-base">Degree Progress</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center w-full">
          
          <div className="w-1/2 flex flex-col justify-center">
            
              <p className="text-ahTextBlack font-bold text-4xl mb-3">{`${78}%`}</p>
           
            <p className="text-sm font-thin text-ahTextGrey">{`${96} completed`}</p>
            <p className="text-sm font-thin text-ahTextGrey">{`${26} remaining`}</p>
          </div>
          <div className="w-full">
            <Image src="/degreeProgressCardImage.png" alt="student degree progress" width={500} height={500} className=""/> 
          </div>
        </CardContent>
    </Card>
  )
}

export default DegreeProgressCard