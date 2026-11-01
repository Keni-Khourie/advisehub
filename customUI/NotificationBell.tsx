"use client"
import { Bell, X} from "lucide-react";
import NotificationCount from "./NotificationCount";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {  useGetUnreadNotificationsQuery, NotificationResponse, useMarkNotificationAsReadMutation } from "@/redux/features/main/notificationsApiSlice";
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

const NotificationBell = () => {
  const { data, isLoading, isError } = useGetUnreadNotificationsQuery()
  console.log(data);
   const [markAsRead] = useMarkNotificationAsReadMutation()

   const handleClick = (id:number)=>{
    markAsRead(id)
   }
  return (
    <div>
        <Popover>
            <PopoverTrigger>
                <div className="flex flex-col items-end relative cursor-pointer">
                  <div className="absolute  left-5">
                    <NotificationCount
                      isLoading={isLoading}
                      isError={isError}
                      unreadCount={data?data.unreadCount:undefined}
                    />
                  </div>
                  <div className="">
                    <Bell className="w-8 h-8 text-ahGreen" />
                  </div>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                {data && <div className="flex flex-col gap-y-2">
                  <div className="flex flex-col gap-y-1">
                    {data.notifications.map((notification)=><NotificationListItem key={notification.id} notification={notification} unreadCount={data.unreadCount} onClickAction={handleClick}/>)}
                  </div>
                <div className="hidden">
                    <Link href="/notifications">
                    <p className="text-ahDeepBlue cursor-pointer hover:underline text-sm bg-ahLightBlue px-2 py-1">View notifications</p></Link>
                </div>
                </div>}
            </PopoverContent>
        </Popover>
    </div>
  );
};

export default NotificationBell;


interface ListItemProps{
  notification:NotificationResponse;
  onClickAction: (id:number)=>void;
  unreadCount:number
}
const NotificationListItem = ({notification, onClickAction, unreadCount}:ListItemProps)=>{
 

  return (
    <div className={cn("flex justify-between items-center", unreadCount>1 && "border rounded-md")}>
      <p>{notification.message}</p>
      <Button className="border border-red-300 bg-red-400 hover:bg-red-500 cursor-pointer p-1 h-6 w-6 rounded-md" onClick={()=>onClickAction(notification.id)}>
        <X className="text-white font-semibold w-4 hover:w-5"/>
      </Button>
    </div>
  )
}