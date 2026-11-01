"use client"
import { Bell } from "lucide-react";
import NotificationCount from "./NotificationCount";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetNotificationsQuery, useGetUnreadNotificationsQuery } from "@/redux/features/main/notificationsApiSlice";
import Link from "next/link"


const NotificationBell = () => {
  const { data, isLoading, isError } = useGetUnreadNotificationsQuery()
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
                <div></div>
                <div>
                    <Link href="/notifications">
                    <p className="text-ahDeepBlue cursor-pointer hover:underline text-sm bg-ahLightBlue px-2 py-1">View notifications</p></Link>
                </div>
            </PopoverContent>
        </Popover>
    </div>
  );
};

export default NotificationBell;
