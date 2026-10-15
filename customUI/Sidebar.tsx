import { cn } from "@/lib/utils";

import SidebarItem from "./SidebarItem";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "./UserAvatar";
import {UserRole, SidebarItemDetails}from "@/types"
import {studentSidebarItems, advisorSidebarItems} from "@/constants"

const Sidebar = () => {
  //fetch user from store
  const user: {role:UserRole} = {
    role: "ADVISOR",
  };
  const getSidebarItemsBasedOnUser = () => {
    const sidebarItems: SidebarItemDetails[] =
      user?.role == "STUDENT"
        ? studentSidebarItems
        : user?.role === "ADVISOR"
          ? advisorSidebarItems
          : [];
    return sidebarItems;
  };

  return (
    <div
      className={cn(
        "bg-white w-60 h-screen justify-center hidden md:inline py-4 px-4",
      )}
    >
      <div className={cn("flex flex-col justify-between h-full")}>
        <div className="flex flex-col gap-y-8">
          <div className="">
            <Image
              src="/advisehub-logo.png"
              width={500}
              height={500}
              alt="AdviseHub logo"
              className="w-28"
            />
          </div>
          <div className="flex flex-col justify-center gap-y-8">
            {getSidebarItemsBasedOnUser().map((item, index) => (
              <SidebarItem key={index} text={item.text} link={item.link} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <Separator className="border " orientation="horizontal" />

          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
