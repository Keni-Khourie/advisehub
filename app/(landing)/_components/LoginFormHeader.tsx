import { cn } from '@/lib/utils';

const LoginFormHeader = () => {
  return (
     <div className={cn("w-full mb-5")}>
        <div className="flex flex-col gap-y-2 justify-center">
            <h2 className="text-ahTextBlack text-5xl font-bold">{"Welcome back"}</h2>
            
            
            <p className="text-ahTextGrey ps-1 ">{"Sign in with your university account" }</p>
            
        </div>
    </div>
  )
}

export default LoginFormHeader