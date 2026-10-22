import { cn } from "cn"
import { Loader2Icon, RotateCw } from "lucide-react"
interface Props extends React.ComponentProps<"svg">{
  type?:"arrow"|"regular"
}

function Spinner({ className, type, ...props }:Props) {
  return (
    <>
    { type==="arrow"? (<RotateCw data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props}/>):
    (<Loader2Icon data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />)
    }
    </>
  )
}

export { Spinner }
