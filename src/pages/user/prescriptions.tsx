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
      dispatch(fetchUserPrescriptions({ token, user_Id:  user.user_id }));
    }
  }, [dispatch, token, user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Prescriptions</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && prescriptions.length > 0 ? (
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Doctor</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Notes</th>
              <th className="px-4 py-2 text-left">Issued</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((p) => (
              <tr key={p.prescription_id} className="border-b">
                <td className="px-4 py-2">{p.doctor?.first_name} {p.doctor?.last_name}</td>
                <td className="px-4 py-2">{p.appointment?.appointment_date}</td>
                <td className="px-4 py-2">{p.appointment?.time_slot}</td>
                <td className="px-4 py-2">{p.notes}</td>
                <td className="px-4 py-2">{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="text-gray-600">No prescriptions found.</p>
      )}
    </div>
  );
};

export default Prescriptions;
