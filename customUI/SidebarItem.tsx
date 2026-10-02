"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props{
    text:string,
    link:string
}

const SidebarItem = ({text, link}:Props) => {
    const isActive = usePathname().includes(link);
  return (
    <Link href={link} aria-disabled={isActive} className="">
        <div className={cn("text-start cursor-pointer font-semibold text-sm", isActive?"text-ahGreen":"text-ahTextBlack hover:text-ahGreen")}>{text}</div>
    </Link>
  )
}

export default SidebarItem