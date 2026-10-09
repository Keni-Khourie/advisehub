import {CircleCheck} from "lucide-react"

interface Props{
text:string
}
const LandingCardOption = ({text}:Props) => {
  return (
    <div className="flex items-center gap-x-3">
        <CircleCheck className="text-white" fill="#20B8B4" size={30}/>
        <p className="font-medium text-sm">{text}</p>
    </div>
  )
}

export default LandingCardOption