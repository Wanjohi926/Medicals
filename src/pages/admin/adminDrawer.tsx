import { NavLink } from "react-router-dom";
import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBill,
  FaCommentDots,
} from "react-icons/fa";

const drawerItems = [
  { name: "View Doctors", icon: FaUserMd, link: "/admindashboard/doctors" },
  { name: "Patients", icon: FaUsers, link: "/admindashboard/patients" },
  { name: "Appointments", icon: FaCalendarCheck, link: "/admindashboard/appointments" },
  { name: "Payments", icon: FaMoneyBill, link: "/admindashboard/payments" },
  { name: "Complaints", icon: FaCommentDots, link: "/admindashboard/complaints" },
];

const AdminDrawer = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto text-white">
      <h2 className="text-lg md:text-xl font-bold p-4 border-b border-gray-700">
        Dashboard Menu
      </h2>
      <ul className="flex-1">
        {drawerItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm md:text-base hover:bg-gray-700 ${
                  isActive ? "bg-gray-700 border-l-4 border-blue-500" : ""
                }`
              }
              end
            >
              <item.icon size={18} className="min-w-[18px]" />
              <span className="whitespace-nowrap">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDrawer;
