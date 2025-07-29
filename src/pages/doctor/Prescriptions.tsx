// src/pages/doctor/DoctorPrescriptions.tsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { fetchUserPrescriptions } from '../../store/prescriptionSlice'

const DoctorPrescriptions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: RootState) => state.auth.token)
  const doctorId = useSelector((state: RootState) => state.auth.user?.user_id)
  const { prescriptions, loading, error } = useSelector((state: RootState) => state.prescriptions)

  useEffect(() => {
    if (token && doctorId) {
      dispatch(fetchUserPrescriptions({ token, user_Id: doctorId }))
    }
  }, [dispatch, token, doctorId])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Prescriptions</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4">Prescription ID</th>
            <th className="py-2 px-4">Patient ID</th>
            <th className="py-2 px-4">Appointment ID</th>
            <th className="py-2 px-4">Notes</th>
            <th className="py-2 px-4">Issued On</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <tr key={prescription.prescription_id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{prescription.prescription_id}</td>
                <td className="py-2 px-4">{prescription.user_id}</td>
                <td className="py-2 px-4">{prescription.appointment_id}</td>
                <td className="py-2 px-4">{prescription.notes}</td>
                <td className="py-2 px-4">{new Date(prescription.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-4 text-center text-gray-500">
                No prescriptions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DoctorPrescriptions
