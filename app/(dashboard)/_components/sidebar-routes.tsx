"use client";

import { BarChart, Compass, Layout, LayoutDashboard, LogOut } from "lucide-react";
import SidebarItems from "./sidebar-item";

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
    label: "My Progress",
    href: "/progress",
  },
];

const SidebarRoutes = () => {
  const routes = guestRoutes;

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
