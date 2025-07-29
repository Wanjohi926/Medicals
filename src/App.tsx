import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Dashboard from './pages/user/Dashboard';
import Services from './pages/user/Services';
import Verify from './pages/user/Verify';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/adminDashboard';
import Appointments from './pages/admin/appointments';
import Payments from './pages/admin/payment';
import AddDoctor from './pages/admin/add-Doctor';
import AddPatient from './pages/admin/addPatient';
import Patients from './pages/admin/patients';
import UpdatePatient from './pages/admin/updatePatient';
import DoctorsDashboard from './pages/admin/doctors';
import UpdateDoctor from './pages/admin/updateDoctor';
import Complaints from './pages/admin/admincomplaints';
import UserComplaints from './pages/user/complaints';
import UserBookAppointment from './pages/user/appointments';
import Prescriptions from './pages/user/prescriptions';
import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorAppointments from './pages/doctor/Appointments';
import DoctorPrescriptions from './pages/doctor/Prescriptions';


export function App() {
  return <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/admin/patients/add" element={<AddPatient />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/admin/doctors" element={<DoctorsDashboard />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/doctors/add" element={<AddDoctor />} />
            <Route path="/admin/patients" element={<Patients />} />
            <Route path="/admin/patients/update/:id" element={<UpdatePatient />} />
            <Route path="/admin/appointments" element={<Appointments />} />
            <Route path="/dashboard" element={<ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>} />
            <Route path="/admin/doctors/update/:id" element={<UpdateDoctor />} />
            <Route path="/admin/complaints" element={<Complaints />} />
            <Route path="/complaint" element={<UserComplaints />} />
            <Route path="/appointment" element={<UserBookAppointment />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/doctor" element={<DoctorDashboard />}>
              <Route path="appointments" element={<DoctorAppointments />} />
              <Route path="prescriptions" element={<DoctorPrescriptions />} />
            </Route>
          </Routes>
          
        </div>
      </Router>
    </Provider>;
}