import Image from "next/image";

import SidebarRoutes from "./sidebar-routes";
import Link from "next/link";

const Sidebar = () => {
  return (
    <section className="h-full w-full flex items-start justify-start flex-col border-r shadow-sm">
      <Link href='/' className="p-6 h-20">
        <Image src="/logo.svg" alt="logo" height={130} width={130} />
      </Link>
      <div className="w-full">
        <SidebarRoutes />
      </div>
    </section>
  );
};

export default Sidebar;
