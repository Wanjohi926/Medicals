import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
const Home = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
<div className="bg-gradient-to-r from-[#fffaf0] to-[#f5f5dc] flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your Health, Our Priority
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Experience healthcare that puts you first. PrimeCare offers
                comprehensive medical services with a focus on patient comfort
                and well-being.
              </p>
              <Link to="/register">
                <Button className="text-lg px-8 py-3">Get Started</Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <img src="https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose PrimeCare
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Expert Physicians
              </h3>
              <p className="text-gray-600">
                Our team of board-certified doctors provides the highest quality
                care.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Modern Facilities
              </h3>
              <p className="text-gray-600">
                State-of-the-art equipment and comfortable environments for all
                patients.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Patient-Centered Care
              </h3>
              <p className="text-gray-600">
                Personalized treatment plans focused on your unique health
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} PrimeCare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>;
};
export default Home;