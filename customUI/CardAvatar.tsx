import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utilityFunctions";
import { cn } from "@/lib/utils";

interface Props{
    fullName:string,
    imageUrl?:string
    additionalStyle?:string
    additionalFallbackStyle?:string
}
const CardAvatar = ({fullName, imageUrl, additionalFallbackStyle, additionalStyle}:Props) => {
  return (
    <Avatar className={cn("h-12 w-12", additionalStyle)}>
        <AvatarImage src={imageUrl}/>
        <AvatarFallback className={cn("bg-ahGreen text-white font-semibold text-lg",additionalFallbackStyle)}>
            {getInitials(fullName)}
        </AvatarFallback>
    </Avatar>
  )
}

export default CardAvatar