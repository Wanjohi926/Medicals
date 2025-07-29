import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDoctors, deleteDoctor } from '../../store/doctorsSlice';
import { RootState, AppDispatch } from '../../store/store';

const DoctorsDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { doctors, loading, error } = useSelector((state: RootState) => state.doctors);

  useEffect(() => {
    if (token) {
      dispatch(fetchDoctors(token));
    }
  }, [dispatch, token]);

  const handleDelete = (id: number) => {
    if (token && confirm('Are you sure you want to delete this doctor?')) {
      dispatch(deleteDoctor({ id, token }));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <button
          onClick={() => navigate('/admin/doctors/add')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Doctor
        </button>
      </div>

      {loading && <p>Loading doctors...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="min-w-full table-auto bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Specialization</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Contact</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.doctor_id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{doc.first_name} {doc.last_name}</td>
              <td className="px-4 py-2">{doc.specialization}</td>
              <td className="px-4 py-2">{doc.email}</td>
              <td className="px-4 py-2">{doc.contact_phone}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => navigate(`/admin/doctors/update/${doc.doctor_id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(doc.doctor_id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {doctors.length === 0 && !loading && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No doctors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsDashboard;
