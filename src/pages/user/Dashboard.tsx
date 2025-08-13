import { NavLink, Outlet } from 'react-router-dom';
import {
  Calendar,
  ClipboardList,
  CreditCard,
  MessageSquareText,
  LogOut,
  UserCircle,
  HeartPulse,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store/store';

const navItems = [
  { name: 'Appointments', path: 'appointments', icon: <Calendar className="w-5 h-5" /> },
  { name: 'Prescriptions', path: 'prescriptions', icon: <ClipboardList className="w-5 h-5" /> },
  { name: 'Payments', path: 'payments', icon: <CreditCard className="w-5 h-5" /> },
  { name: 'Complaints', path: 'complaints', icon: <MessageSquareText className="w-5 h-5" /> },
];

const UserDashboardLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-blue-800 text-white flex flex-col shadow-lg">
        <div className="p-6 border-b border-blue-700 flex items-center space-x-3">
          <HeartPulse className="w-7 h-7 text-white" />
          <span className="text-xl font-bold">PrimeCare</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-white text-blue-800'
                    : 'text-white hover:bg-blue-700 hover:text-white'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Patient Dashboard</h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <UserCircle className="w-7 h-7 text-blue-600" />
              <div className="text-sm text-gray-700">
                <div className="font-semibold">
                  {user ? `${user.first_name} ${user.last_name}` : 'Guest'}
                </div>
                <div className="text-xs text-gray-500">Patient</div>
              </div>
            </div>

            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main className="p-6 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
