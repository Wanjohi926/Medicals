import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { RootState } from '../store/store';

const Navbar = () => {
  

  const {
    isAuthenticated
  } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                PrimeCare
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/services" className="px-3 py-2 text-gray-700 hover:text-blue-600">
              Services
            </Link>
            {isAuthenticated ? <>
                <Link to="/dashboard" className="px-3 py-2 text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="px-3 py-2 text-gray-700 hover:text-blue-600">
                  Logout
                </button>
              </> : <Link to="/login/role" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Login
              </Link>}
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;