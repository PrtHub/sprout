"use client";

import { BarChart, BarChart2, Compass, Layout, List, ShoppingBag } from "lucide-react";
import SidebarItems from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Overview",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browser",
    href: "/search",
  },
  {
    icon: BarChart,
    label: "My progress",
    href: "/progress",
  },
  {
    icon: ShoppingBag,
    label: "My wishlist",
    href: "/wishlist",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart2,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <section className="w-full flex flex-col">
      {routes.map((route) => (
        <SidebarItems
          key={route.label}
          label={route.label}
          href={route.href}
          icon={route.icon}
        />
      ))}
    </section>
  );
};

export default SidebarRoutes;
