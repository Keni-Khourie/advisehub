"use client"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getInitials } from "@/lib/utilityFunctions";
import {signOutUser} from "@/lib/actions/auth"
const UserAvatar = () => {
    //fetch user from store
    const alex ={
        firstName:"Alex",
        lastName:"Johnson",
        role:"STUDENT"
    }
    const jordan ={
        firstName:"Jordan",
        lastName:"Lee",
        role:"ADVISOR"
    }
    const user = alex
    
  return (
    <div className="flex gap-x-3">
        <Popover>
            <PopoverTrigger>
                <Avatar className="w-10 h-10">
            <AvatarImage src={undefined}/>
            <AvatarFallback className="text-white font-semibold bg-ahGreen">
                {getInitials(`${user.firstName} ${user.lastName}`)}
            </AvatarFallback>
        </Avatar>
            </PopoverTrigger>

            <PopoverContent className="bg-white px-3 py-3">
                <div className="flex flex-col gap-y-2 text-sm">
                    <p>{`firstName lastName`}</p>
                    <p>{`email@email.com`}</p>
                </div>
                <div className="shadow-sm">
                    <Button className="border-none bg-transparent cursor-pointer text-ahTextBlack" onClick={signOutUser}>
                        Logout
                    </Button>
                </div>
            </PopoverContent>
            
        </Popover>
        

        <div>
            <p className="text-ahTextBlack font-semibold text-wrap">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-ahTextGrey  text-sm">{user.role==="STUDENT"?"Student":user.role==="ADVISOR"?"Advisor":user.role==="ADMIN"?"Admin":""}</p>
        </div>
    </div>
  )
}

export default UserAvatar