import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">PrimeCare</h1>
        <div className="space-x-4">
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
            Dashboard
          </Link>
          <Link to="/logout" className="text-gray-700 hover:text-red-600 font-medium">
            Logout
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-6">Menu</h2>
          <nav className="space-y-4">
            <Link to="/appointment" className="block text-left hover:bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium">
              Book Appointment
            </Link>
            <Link to="/prescriptions" className="block text-left hover:bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium">
              View Prescriptions
            </Link>
            <Link to="/payments" className="block text-left hover:bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium">
              Make Payments
            </Link>
            <Link to="/complaint" className="block text-left hover:bg-gray-100 px-4 py-2 rounded text-gray-800 font-medium">
              Make a Complaint
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Welcome to PrimeCare Dashboard</h1>
              {user && (
                <p className="mt-2 text-lg text-gray-600">
                  Hello, {user.first_name} {user.last_name}
                </p>
              )}
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
              <p className="text-sm text-blue-700">
                Your patient portal is active. Use the menu to access your services.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded shadow">
                <h3 className="font-medium text-gray-800 mb-1">Appointments</h3>
                <p className="text-sm text-gray-600">View and manage your upcoming visits.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow">
                <h3 className="font-medium text-gray-800 mb-1">Prescriptions</h3>
                <p className="text-sm text-gray-600">Check your prescribed medications.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow">
                <h3 className="font-medium text-gray-800 mb-1">Payments</h3>
                <p className="text-sm text-gray-600">Review and make payments securely.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded shadow">
                <h3 className="font-medium text-gray-800 mb-1">Complaints</h3>
                <p className="text-sm text-gray-600">Raise any concerns you may have.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
