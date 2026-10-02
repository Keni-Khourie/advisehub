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
    <Link href={link} aria-disabled={isActive} className="flex justify-center">
        <div className={cn("text-center")}></div>

    </Link>
  )
}

export default SidebarItem