import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0a0e17]">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto h-full scrollbar-custom">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
