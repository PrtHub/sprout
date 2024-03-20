"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemsProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

const SidebarItems = ({ label, href, icon: Icon }: SidebarItemsProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center pl-6 text-gray-500 font-medium hover:text-gray-600  transition-all hover:bg-gray-300/20",
        isActive &&
          "text-orange bg-gray-100 hover:text-orange hover:bg-gray-300/20"
      )}
    >
      <span className="flex items-center gap-x-2 py-4">
        <Icon size={22} />
        {label}
      </span>
      <span
        className={cn(
          "ml-auto border-2 border-orange opacity-0 h-16 transition-all",
          isActive && "opacity-100"
        )}
      ></span>
    </button>
  );
};
export default SidebarItems;
