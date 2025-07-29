import Navbar from '../../components/Navbar';
const Services = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive healthcare solutions for you and your family
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>)}
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
const services = [{
  title: 'Primary Care',
  description: 'Comprehensive healthcare services for patients of all ages, focusing on prevention, diagnosis, and treatment.'
}, {
  title: 'Specialized Medicine',
  description: 'Expert care in cardiology, neurology, orthopedics, and other specialized fields of medicine.'
}, {
  title: 'Pediatric Care',
  description: 'Dedicated healthcare services for infants, children, and adolescents, ensuring healthy development.'
}, {
  title: 'Diagnostic Services',
  description: 'Advanced laboratory testing, imaging, and other diagnostic procedures to identify health conditions.'
}, {
  title: 'Preventive Care',
  description: 'Regular check-ups, screenings, and immunizations to maintain good health and prevent disease.'
}, {
  title: 'Telemedicine',
  description: 'Virtual consultations with healthcare providers from the comfort of your home.'
}];
export default Services;