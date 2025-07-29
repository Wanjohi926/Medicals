import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePatient, fetchPatients } from '../../store/patientsSlice';
import { RootState } from '../../store/store';

const UpdatePatient = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  const { patients } = useSelector((state: RootState) => state.patients);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    const patient = patients.find((p) => p.id === Number(id));
    if (patient) {
      setFormData({
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
      });
    } else {
      dispatch(fetchPatients(token) as any);
    }
  }, [dispatch, id, patients, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updatePatient({ id: Number(id), data: formData, token }) as any).then(() => {
      navigate('/admin/Updatepatients');
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md p-6 rounded">
      <h2 className="text-2xl font-bold mb-6">Update Patient</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Patient
        </button>
      </form>
    </div>
  );
};

export default UpdatePatient;
