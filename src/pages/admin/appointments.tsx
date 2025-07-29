// src/pages/admin/Appointments.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../store/appointmentsSlice';
import type { AppDispatch, RootState } from '../../store/store';

const Appointments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { appointments, loading, error } = useSelector((state: RootState) => state.appointments);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchAppointments(token));
    }
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Appointments</h1>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Patient ID</th>
                <th className="px-4 py-2 text-left">Doctor ID</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time Slot</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.appointment_id} className="border-b">
                  <td className="px-4 py-2">{appt.user_id}</td>
                  <td className="px-4 py-2">{appt.doctor_id}</td>
                  <td className="px-4 py-2">{appt.appointment_date}</td>
                  <td className="px-4 py-2">{appt.time_slot}</td>
                  <td className="px-4 py-2">{appt.appointment_status}</td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-4">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Appointments;
