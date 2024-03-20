import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full">
        <section className="flex h-20 w-full md:pl-56 fixed inset-y-0 z-50">
         <Navbar/>
        </section>
      <section className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </section>
        <main className="h-full md:pl-56">{children}</main>
      </div>
    </>
  );
};

export default DashBoardLayout;
