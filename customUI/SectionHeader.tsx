import { cn } from "@/lib/utils";
interface Props{
    headerText:string,
    subtitle?:string,
    additionalClass?:string
}
const SectionHeader = ({headerText, subtitle, additionalClass}:Props) => {
  return (
    <div className={cn("w-full flex justify-between items-center mb-5", additionalClass)}>
        <div className="flex flex-col gap-y-2">
            <h2 className="text-ahTextBlack text-3xl font-bold">{headerText}</h2>
            {
            subtitle &&
            <p className="text-ahTextGrey ps-1 text-sm">{subtitle}</p>
            }
        </div>
    </div>
  )
}

export default SectionHeader