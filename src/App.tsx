import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import Home from './pages/user/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Services from './pages/user/Services';
import Verify from './pages/user/Verify';
import Dashboard from './pages/user/Dashboard';
import LoginRoleSelector from './components/loginSelector';

import Appointments from './pages/admin/appointments';
import AddDoctor from './pages/admin/add-Doctor';
import AddPatient from './pages/admin/addPatient';
import AdminDashboard from './pages/admin/adminDashboard';
import DoctorsDashboard from './pages/admin/doctors';
import Payments from './pages/admin/payment';
import Patients from './pages/admin/patients';
import UpdatePatient from './pages/admin/updatePatient';
import UpdateDoctor from './pages/admin/updateDoctor';
import Complaints from './pages/admin/admincomplaints';
import LoginDoctor from './pages/doctor/loginDoctor';
import LoginAdmin from './pages/admin/loginAdmin';

import UserBookAppointment from './pages/user/appointments';
import Prescriptions from './pages/user/prescriptions';
import UserComplaints from './pages/user/complaints';

import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorAppointments from './pages/doctor/Appointments';
import DoctorPrescriptions from './pages/doctor/Prescriptions';

import ProtectedRoute from './components/ProtectedRoute';
import UserPayments from './pages/user/payment';

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/login/doctor" element={<LoginDoctor />} />
            <Route path="/login/admin" element={<LoginAdmin />} />  
            <Route path="/login/role" element={<LoginRoleSelector />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/admin/doctors" element={<DoctorsDashboard />} />
            <Route path="/admin/doctors/add" element={<AddDoctor />} />
            <Route path="/admin/doctors/update/:id" element={<UpdateDoctor />} />
            <Route path="/admin/patients" element={<Patients />} />
            <Route path="/admin/patients/add" element={<AddPatient />} />
            <Route path="/admin/patients/update/:id" element={<UpdatePatient />} />
            <Route path="/admin/appointments" element={<Appointments />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/complaints" element={<Complaints />} />

            <Route path="/doctor" element={<DoctorDashboard />}>
              <Route path="appointments" element={<DoctorAppointments />} />
              <Route path="prescriptions" element={<DoctorPrescriptions />} />
            </Route>

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="appointments" element={<UserBookAppointment />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="complaints" element={<UserComplaints />} />
              <Route path="payments" element={<UserPayments />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
