import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchAllComplaints } from '../../store/complaintsSlice';

type Complaint = {
  complaint_id: number;
  user_id: number;
  related_appointment_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const AdminComplaints = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const { complaints, loading, error } = useSelector(
    (state: RootState) =>
      state.complaints as {
        complaints: Complaint[];
        loading: boolean;
        error: string | null;
      }
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchAllComplaints(token));
    }
  }, [dispatch, token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Complaints</h1>

      {loading && <p>Loading complaints...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && complaints.length === 0 && (
        <p className="text-gray-600">No complaints found.</p>
      )}

      {!loading && complaints.length > 0 && (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Subject</th>
                <th className="px-4 py-2 border-b">Description</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint: Complaint, index: number) => (
                <tr key={complaint.complaint_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{complaint.subject}</td>
                  <td className="px-4 py-2 border-b max-w-sm truncate">
                    {complaint.description}
                  </td>
                  <td className="px-4 py-2 border-b">{complaint.status}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(complaint.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminComplaints;
