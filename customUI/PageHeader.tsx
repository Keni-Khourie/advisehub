import {CircleQuestionMark} from "lucide-react"
interface Props{
    headerText:string,
    subtitle?:string,
}

const PageHeader = ({headerText, subtitle}:Props) => {
  return (
    <div className="w-full flex justify-between items-center ">
        <div className="flex flex-col gap-x-2">
            <h2 className="text-ahTextBlack text-lg font-semibold">{headerText}</h2>
            {
            subtitle &&
            <p className="text-ahTextGrey">{subtitle}</p>
            }
        </div>
        <div>
        <CircleQuestionMark className="text-ahTextGrey font-thin cursor-pointer" />
        </div>
    </div>
  )
}

export default PageHeader