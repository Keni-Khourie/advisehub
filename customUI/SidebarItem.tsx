"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface Props {
  text: string;
  link: string;
}

const SidebarItem = ({ text, link }: Props) => {
  const isActive = usePathname().includes(link);
  return (
    <Link href={link} aria-disabled={isActive} className="">
      <div
        className={cn(
          "text-start cursor-pointer font-medium text-sm h-10 px-1.5 py-2 rounded-sm",
          isActive
            ? "text-ahTextBlack bg-ahBgBlue font-semibold"
            : "text-ahTextGrey hover:bg-ahBgBlue",
        )}
      >
        {text}
      </div>
    </Link>
  );
};

export default SidebarItem;
