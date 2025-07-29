import { FaUserMd, FaUsers, FaCalendarCheck, FaMoneyBill, FaCommentDots, FaPlus, FaUserTimes } from "react-icons/fa";

export const adminDrawerData = [
  {
    id: 1,
    name: "View Doctors",
    icon: FaUserMd,
    link: "/admin/doctors",
  },
  {
    id: 2,
    name: "Add Doctor",
    icon: FaPlus,
    link: "/admin/doctors/add",
  },
  {
    id: 3,
    name: "Remove Doctor",
    icon: FaUserTimes,
    link: "/admin/doctors/remove",
  },
  {
    id: 4,
    name: "Patients",
    icon: FaUsers,
    link: "/admin/patients",
  },
  {
    id: 5,
    name: "Appointments",
    icon: FaCalendarCheck,
    link: "/admin/appointments",
  },
  {
    id: 6,
    name: "Payments",
    icon: FaMoneyBill,
    link: "/admin/payments",
  },
  {
    id: 7,
    name: "ViewComplaints",
    icon: FaCommentDots,
    link: "/admin/complaints",
  },
];
