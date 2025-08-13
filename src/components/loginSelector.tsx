import { useNavigate } from 'react-router-dom';

const LoginRoleSelector = () => {
  const navigate = useNavigate();

  const handleSelect = (role: 'user' | 'doctor' | 'admin') => {
    if (role === 'user') navigate('/login');
    if (role === 'doctor') navigate('/login/doctor');
    if (role === 'admin') navigate('/login/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center space-y-4">
        <h2 className="text-xl font-bold">Choose Login Type</h2>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={() => handleSelect('user')}
        >
          Login as User
        </button>
        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={() => handleSelect('doctor')}
        >
          Login as Doctor
        </button>
        <button
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          onClick={() => handleSelect('admin')}
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default LoginRoleSelector;
