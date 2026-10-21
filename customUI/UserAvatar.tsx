"use client"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { HiLogout } from "react-icons/hi";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getInitials } from "@/lib/utilityFunctions";
import {signOutUser} from "@/lib/actions/auth"
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/reduxHooks";
import { useDispatch } from "react-redux";
const UserAvatar = () => {
    //fetch user from store
    const dispatch = useDispatch()
    const user = useAppSelector((state: RootState) => state.user);
   
    
  return (
    <div className="flex gap-x-3">
        <Popover>
            <PopoverTrigger>
                <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarImage src={user.image}/>
            <AvatarFallback className="text-white font-semibold bg-ahGreen">
                {getInitials(`${user.firstName} ${user.lastName}`)}
            </AvatarFallback>
        </Avatar>
            </PopoverTrigger>

            <PopoverContent className="bg-white py-5 ">
                <div className="flex flex-col items-center gap-y-2 text-sm">
                    <p className="font-semibold border-b w-full px-5">{`${user.firstName} ${user.lastName}`}</p>
                    <p className="text-ahTextGrey border-b w-full px-5">{user.email}</p>
                </div>
                <div className="flex justify-center">
                    <Button className="w-full bg-ahLightBlue hover:bg-ahBorderBlue cursor-pointer text-ahDeepBlue text-left font-semibold border border-stone-100" onClick={signOutUser}>
                        Logout <HiLogout/>
                    </Button>
                </div>
            </PopoverContent>
            
        </Popover>
        

        <div>
            <p className="text-ahTextBlack font-semibold text-wrap">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-ahTextGrey  text-sm">{user.role==="STUDENT"?"Student":user.role==="ADVISOR"?"Advisor":user.role==="ADMIN"?"Admin":"USER"}</p>
        </div>
    </div>
  )
}

export default UserAvatar