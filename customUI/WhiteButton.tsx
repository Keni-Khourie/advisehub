import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ComponentProps } from "react";
interface Props extends ComponentProps<typeof Button>{
    text:string,
    additionalStyle?:string
}
const WhiteButton = ({text, additionalStyle, ...props}:Props) => {
  return (
    <Button className={cn("bg-white hover:bg-stone-100 text-ahTextBlack text-center font-semibold text-sm h-10 rounded-lg cursor-pointer border w-full md:w-40",additionalStyle)} {...props}>{text}</Button>
  )
}

export default WhiteButton