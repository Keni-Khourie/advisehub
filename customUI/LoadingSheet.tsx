import {Spinner} from "@/components/ui/spinner"


const LoadingSheet = () => {
  return (
    <div className="fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs flex flex-col justify-center items-center">
        <Spinner className="w-40 h-40  text-ahDeepBlue" type="arrow"/>
    </div>
  )
}

export default LoadingSheet