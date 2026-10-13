import { cn } from "@/lib/utils";
import { FaCheckCircle } from "react-icons/fa";
interface Props {
size?:number
additionalClass?:string
}

const BlueCheck = ({size, additionalClass}:Props) => {
  return (
    <FaCheckCircle className={cn("rounded-full text-ahDeepBlue bg-white", additionalClass)} size={size??28} />
  )
}

export default BlueCheck