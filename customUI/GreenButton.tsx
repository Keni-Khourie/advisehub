import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ComponentProps } from "react";
interface Props extends ComponentProps<typeof Button>{
    text:string,
    additionalStyle?:string
}

const GreenButton = ({text, additionalStyle, ...props}:Props) => {
    
  return (
    <Button className={cn("bg-ahGreen text-white text-center font-semibold text-sm w-full h-10 rounded-sm",additionalStyle)} {...props}>{text}</Button>
  )
}

export default GreenButton


