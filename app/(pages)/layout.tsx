import Sidebar from "@/customUI/Sidebar";
import { ReactNode} from "react";
import { auth } from "@/auth";
import AblyNotificationsProvider from "../providers/AblyNotificationsProvider";


interface Props {
  children: ReactNode;
}

const PagesLayout = async ({ children }: Props) => {
  const session = await auth();

  const userId = session?.user?.id
    ? Number(session.user.id)
    : null;

  return (
    <AblyNotificationsProvider userId={userId}>
       <div className="font-inter w-full flex">
      
        <Sidebar/>
        <div className="py-4 ps-8 pr-8 md:pr-32 w-full bg-ahBgBlue h-screen overflow-y-scroll">{children}</div>
    </div>
    </AblyNotificationsProvider>
   
  )
}

export default PagesLayout