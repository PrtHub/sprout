import Image from "next/image";

import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <section className="h-full w-full flex items-start justify-start flex-col border-r shadow-sm">
      <span className="p-6 h-20">
        <Image src="/logo.png" alt="logo" height={130} width={130} />
      </span>
      <div className="w-full">
        <SidebarRoutes />
      </div>
    </section>
  );
};

export default Sidebar;
