import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchDoctors } from '../../store/doctorsSlice';
import api from '../../services/api';

const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const UpdateDoctor = () => {
  const { id } = useParams();
  const doctorId = Number(id);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { doctors } = useSelector((state: RootState) => state.doctors);
  const selectedDoctor = doctors.find((doc) => doc.doctor_id === doctorId);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact_phone: '',
    specialization: '',
    available_days: [] as string[],
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchDoctors(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedDoctor) {
      const parsedDays: string[] = Array.isArray(selectedDoctor.available_days)
        ? selectedDoctor.available_days
        : typeof selectedDoctor.available_days === 'string'
        ? (selectedDoctor.available_days as string)
            .replace(/[{}"]/g, '')
            .split(',')
            .map((d: string) => d.trim())
        : [];

      setFormData({
        first_name: selectedDoctor.first_name,
        last_name: selectedDoctor.last_name,
        email: selectedDoctor.email || '',
        contact_phone: selectedDoctor.contact_phone,
        specialization: selectedDoctor.specialization,
        available_days: parsedDays,
      });
    }
  }, [selectedDoctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      available_days: prev.available_days.includes(day)
        ? prev.available_days.filter((d) => d !== day)
        : [...prev.available_days, day],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Unauthorized');

      await api.put(`/doctor/${doctorId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(fetchDoctors(token));
      navigate('/admin/doctors');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4 py-8">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Update Doctor</h2>
          <p className="mt-2 text-gray-600">Edit doctor details</p>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="contact_phone"
            placeholder="Contact Phone"
            value={formData.contact_phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Days
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allDays.map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.available_days.includes(day)}
                    onChange={() => handleCheckboxChange(day)}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Doctor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDoctor;
