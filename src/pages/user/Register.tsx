import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import { registerPatient, clearError } from '../../store/authSlice';
import type { AppDispatch } from '../../store/store';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();

  const {
    isAuthenticated,
    error
  } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(clearError());
    if (isAuthenticated) {
      navigate('/verify');
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.first_name) {
      errors.first_name = 'First name is required';
    }
    if (!formData.last_name) {
      errors.last_name = 'Last name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const resultAction = await dispatch(registerPatient(formData));
      if (registerPatient.fulfilled.match(resultAction)) {
        navigate('/verify');
      } else {
        alert('Registration failed. Try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">
              Join PrimeCare for better healthcare
            </p>
          </div>
          {error && <Alert type="error" message={error} />}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input id="first_name" name="first_name" type="text" value={formData.first_name} onChange={handleChange} className={`mt-1 block w-full rounded-md border ${formErrors.first_name ? 'border-red-500' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                {formErrors.first_name && <p className="mt-1 text-sm text-red-600">
                    {formErrors.first_name}
                  </p>}
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input id="last_name" name="last_name" type="text" value={formData.last_name} onChange={handleChange} className={`mt-1 block w-full rounded-md border ${formErrors.last_name ? 'border-red-500' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
                {formErrors.last_name && <p className="mt-1 text-sm text-red-600">
                    {formErrors.last_name}
                  </p>}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full rounded-md border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
              {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input id="password" name="password" type="password" autoComplete="new-password" value={formData.password} onChange={handleChange} className={`mt-1 block w-full rounded-md border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500`} />
              {formErrors.password && <p className="mt-1 text-sm text-red-600">
                  {formErrors.password}
                </p>}
            </div>
            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>;
};

export default Register;
