import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AdminDrawer from "../admin/aside";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex px-4 py-4 bg-gray-700 items-center">
        <button
          className="mr-4 text-white text-2xl lg:hidden"
          onClick={handleDrawerToggle}
        >
          {drawerOpen ? <IoCloseSharp /> : <FaBars />}
        </button>
        <span className="text-white text-lg font-semibold">
          Welcome to your Admin dashboard
        </span>
      </div>

      <div className="flex flex-1 relative">
        {drawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
            onClick={handleDrawerToggle}
          ></div>
        )}

        <aside
          className={`
            fixed top-0 left-0 z-40 w-64 h-full bg-gray-800 transform transition-transform duration-300
            ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:translate-x-0 lg:block
          `}
        >
          <div className="h-full overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-white text-2xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoCloseSharp />
            </button>
            <AdminDrawer />
          </div>
        </aside>

        <main className="flex-1 bg-blue-50 min-h-screen p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
