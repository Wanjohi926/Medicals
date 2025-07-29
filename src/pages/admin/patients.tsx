import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import {
  fetchPatients,
  deletePatient,
//   clearPatientMessage,
} from '../../store/patientsSlice';

const Patients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  const { patients, loading, error, successMessage } = useSelector(
    (state: RootState) => state.patients
  );

  useEffect(() => {
    dispatch(fetchPatients(token) as any);
  }, [dispatch, token]);

//   const handleDelete = (id: number) => {
//       console.log('Deleting patient', id, token);
//     if (confirm('Are you sure you want to delete this patient?')) {
//       dispatch(deletePatient({ id, token }) as any);
//     }
//   };

const handleDelete = (id: number) => {
  const token = localStorage.getItem('token') || '';
  console.log('Deleting patient with ID:', id); // 👈 Add this
  dispatch(deletePatient({ id, token }) as any);
};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Patients</h2>
        <button
          onClick={() => navigate('/admin/patients/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Patient
        </button>
      </div>

      {successMessage && (
        <p className="text-green-600 mb-2">{successMessage}</p>
      )}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">First Name</th>
                <th className="px-4 py-2 text-left">Last Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b">
                  <td className="px-4 py-2">{patient.first_name}</td>
                  <td className="px-4 py-2">{patient.last_name}</td>
                  <td className="px-4 py-2">{patient.email}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/patients/update/${patient.id}`)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No patients found.
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

export default Patients;
