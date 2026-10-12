import { cn } from "@/lib/utils";
import { FaCheckCircle } from "react-icons/fa";
interface Props {
size?:number
additionalClass?:string
}

const GreenCheck = ({size, additionalClass}:Props) => {
  return (
    <FaCheckCircle className={cn("text-ahGreen bg-white rounded-full", additionalClass)} size={size??28} />
  )
}

export default GreenCheck