import Sidebar from "@/customUI/Sidebar";
import { ReactNode} from "react";
interface Props {
  children: ReactNode;
}

const PagesLayout = ({ children }: Props) => {
  return (
    <div className="font-inter w-full flex">
        <Sidebar/>
        <div className="py-4 ps-8 pr-8 md:pr-32 w-full bg-ahBgBlue">{children}</div>
    </div>
  )
}

export default PagesLayout