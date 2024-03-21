"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isChapterPage = pathname?.includes("/chapter");

  return (
    <div className="ml-auto flex gap-x-2">
      {isTeacherPage || isChapterPage ? (
        <Link href="/">
          <Button variant="ghost">
            <LogOut className="w-4 h-4 mr-2" /> Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button variant="ghost" size="default">
          Become Instructor
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;
