import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { fetchAppointments } from '../../store/appointmentsSlice'

const DoctorAppointments = () => {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)
  const { appointments, loading, error } = useSelector((state: RootState) => state.appointments)

  useEffect(() => {
    if (token) {
      dispatch(fetchAppointments(token))
    }
  }, [dispatch, token])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Appointments</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Patient ID</th>
            <th className="py-2 px-4">Doctor ID</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Time</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt.appointment_id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{appt.user_id}</td>
                <td className="py-2 px-4">{appt.doctor_id}</td>
                <td className="py-2 px-4">{appt.appointment_date}</td>
                <td className="py-2 px-4">{appt.time_slot}</td>
                <td className="py-2 px-4">{appt.appointment_status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-500">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DoctorAppointments
