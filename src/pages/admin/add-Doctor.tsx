import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { addDoctor, resetAddDoctorState } from '../../store/addDoctorSlice';
import type { AppDispatch, RootState } from '../../store/store';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    contact_phone: '',
    specialization: '',
    available_days: [] as string[],
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state: RootState) => state.addDoctor || {});

  useEffect(() => {
    if (success) {
      navigate('/admin/doctors');
    }

    return () => {
      dispatch(resetAddDoctorState());
    };
  }, [dispatch, success, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: '',
      });
    }
  };

  const handleCheckboxChange = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      available_days: prev.available_days.includes(day)
        ? prev.available_days.filter((d) => d !== day)
        : [...prev.available_days, day],
    }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.first_name) errors.first_name = 'First name is required';
    if (!formData.last_name) errors.last_name = 'Last name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!formData.contact_phone) errors.contact_phone = 'Contact is required';
    if (!formData.specialization) errors.specialization = 'Specialization is required';
    if (formData.available_days.length === 0) {
      errors.available_days = 'Select at least one available day';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(addDoctor(formData));
  };

  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 px-4 py-8">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Add New Doctor</h2>
          <p className="mt-2 text-gray-600">Fill in the details to register a doctor</p>
        </div>

        {error && <Alert type="error" message={error} />}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  formErrors.first_name ? 'border-red-500' : 'border-gray-300'
                } shadow-sm px-3 py-2`}
              />
              {formErrors.first_name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.first_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  formErrors.last_name ? 'border-red-500' : 'border-gray-300'
                } shadow-sm px-3 py-2`}
              />
              {formErrors.last_name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.last_name}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                formErrors.email ? 'border-red-500' : 'border-gray-300'
              } shadow-sm px-3 py-2`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                formErrors.password ? 'border-red-500' : 'border-gray-300'
              } shadow-sm px-3 py-2`}
            />
            {formErrors.password && (
              <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              id="contact_phone"
              name="contact_phone"
              type="text"
              value={formData.contact_phone}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                formErrors.contact_phone ? 'border-red-500' : 'border-gray-300'
              } shadow-sm px-3 py-2`}
            />
            {formErrors.contact_phone && (
              <p className="mt-1 text-sm text-red-600">{formErrors.contact_phone}</p>
            )}
          </div>

          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
              Specialization
            </label>
            <input
              id="specialization"
              name="specialization"
              type="text"
              value={formData.specialization}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border ${
                formErrors.specialization ? 'border-red-500' : 'border-gray-300'
              } shadow-sm px-3 py-2`}
            />
            {formErrors.specialization && (
              <p className="mt-1 text-sm text-red-600">{formErrors.specialization}</p>
            )}
          </div>

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
            {formErrors.available_days && (
              <p className="text-sm text-red-600 mt-1">{formErrors.available_days}</p>
            )}
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Adding doctor...' : 'Add Doctor'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
