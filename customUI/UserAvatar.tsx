"use client"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { getInitials } from "@/lib/utilityFunctions";
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
        <Avatar className="w-10 h-10">
            <AvatarImage src={undefined}/>
            <AvatarFallback className="text-white font-semibold bg-ahGreen">
                {getInitials(`${user.firstName} ${user.lastName}`)}
            </AvatarFallback>
        </Avatar>

        <div>
            <p className="text-ahTextBlack font-semibold text-wrap">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-ahTextGrey  text-sm">{user.role==="STUDENT"?"Student":user.role==="ADVISOR"?"Advisor":user.role==="ADMIN"?"Admin":""}</p>
        </div>
    </div>
  )
}

export default UserAvatar