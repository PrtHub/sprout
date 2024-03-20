import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <section className="w-full h-full border-b shadow-sm p-4 flex items-center justify-between bg-white">
      <MobileSidebar />
      <NavbarRoutes />
    </section>
  );
};

export default Navbar;
