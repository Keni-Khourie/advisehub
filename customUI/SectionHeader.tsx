import { cn } from "@/lib/utils";
interface Props{
    headerText:string,
    subtitle?:string,
    additionalClass?:string
}
const SectionHeader = ({headerText, subtitle, additionalClass}:Props) => {
  return (
    <div className={cn("w-full flex justify-between items-center ", additionalClass)}>
        <div className="flex flex-col gap-x-2">
            <h2 className="text-ahTextBlack text-4xl font-bold">{headerText}</h2>
            {
            subtitle &&
            <p className="text-ahTextGrey ps-1">{subtitle}</p>
            }
        </div>
    </div>
  )
}

export default SectionHeader