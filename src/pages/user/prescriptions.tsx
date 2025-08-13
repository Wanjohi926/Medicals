import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPrescriptions } from '../../store/prescriptionSlice';
import { RootState, AppDispatch } from '../../store/store';

const Prescriptions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const { prescriptions, loading, error } = useSelector((state: RootState) => state.prescriptions);

  useEffect(() => {
    if (token && user) {
      dispatch(fetchUserPrescriptions({ token, user_Id: user.user_id }));
    }
  }, [dispatch, token, user]);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">My Prescriptions</h1>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && prescriptions.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Prescription ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Doctor ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Appointment ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Notes</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Issued On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {prescriptions.map((p) => (
                <tr key={p.prescription_id}>
                  <td className="px-4 py-2">{p.prescription_id}</td>
                  <td className="px-4 py-2">{p.doctor_id}</td>
                  <td className="px-4 py-2">{p.appointment_id}</td>
                  <td className="px-4 py-2">{p.notes}</td>
                  <td className="px-4 py-2">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-600">No prescriptions found.</p>
      )}
    </div>
  );
};

export default Prescriptions;
