import { cn } from "@/lib/utils";
import {CircleQuestionMark} from "lucide-react"
interface Props{
    headerText:string,
    subtitle?:string,
    noInfo?:boolean,
    additionalClass?:string
}

const PageHeader = ({headerText, subtitle, noInfo, additionalClass}:Props) => {
  return (
    <div className={cn("w-full flex justify-between items-center mb-20", additionalClass)}>
        <div className="flex flex-col gap-x-2">
            <h2 className="text-ahTextBlack text-4xl font-bold">{headerText}</h2>
            {
            subtitle &&
            <p className="text-ahTextGrey ps-1">{subtitle}</p>
            }
        </div>
        <div>
        {!noInfo && <CircleQuestionMark className="text-ahTextGrey font-light cursor-pointer" size={30} fontWeight={"200px"}/>}
        </div>
    </div>
  )
}

export default PageHeader