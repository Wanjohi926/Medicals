// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../../store/store';
// import { fetchDoctors } from '../../store/doctorsSlice';
// import appointmentService from '../../services/appointmentsService';

// const UserBookAppointment = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const token = useSelector((state: RootState) => state.auth.token);
//   const user = useSelector((state: RootState) => state.auth.user);
//   const { doctors, loading, error } = useSelector((state: RootState) => state.doctors);

//   const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
//   const [appointmentDate, setAppointmentDate] = useState('');
//   const [timeSlot, setTimeSlot] = useState('');
//   const [success, setSuccess] = useState('');
//   const [submitError, setSubmitError] = useState('');

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchDoctors(token));
//     }
//   }, [dispatch, token]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedDoctor || !appointmentDate || !timeSlot) {
//       setSubmitError('Please fill all fields');
//       return;
//     }

//     try {
//       await appointmentService.bookAppointment(token!, {
//         doctor_id: selectedDoctor,
//         user_id: user?.id || user?.user_id,
//         appointment_date,
//         time_slot: timeSlot,
//         appointment_status: 'Pending',
//       });

//       setSuccess('Appointment booked successfully.');
//       setAppointmentDate('');
//       setTimeSlot('');
//       setSelectedDoctor(null);
//       setSubmitError('');
//     } catch (err) {
//       setSubmitError('Failed to book appointment.');
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Available Doctors</h1>

//       {success && <p className="text-green-600 mb-2">{success}</p>}
//       {submitError && <p className="text-red-600 mb-2">{submitError}</p>}

//       {loading && <p>Loading doctors...</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       {!loading && doctors.length > 0 && (
//         <div className="overflow-x-auto bg-white shadow rounded mb-6">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 text-left">Name</th>
//                 <th className="px-4 py-2 text-left">Specialization</th>
//                 <th className="px-4 py-2 text-left">Email</th>
//                 <th className="px-4 py-2 text-left">Phone</th>
//                 <th className="px-4 py-2 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {doctors.map((doc) => (
//                 <tr key={doc.doctor_id} className="border-b">
//                   <td className="px-4 py-2">{doc.first_name} {doc.last_name}</td>
//                   <td className="px-4 py-2">{doc.specialization}</td>
//                   <td className="px-4 py-2">{doc.email}</td>
//                   <td className="px-4 py-2">{doc.contact_phone}</td>
//                   <td className="px-4 py-2">
//                     <button
//                       onClick={() => setSelectedDoctor(doc.doctor_id)}
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                     >
//                       Book
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {selectedDoctor && (
//         <form onSubmit={handleSubmit} className="space-y-4 max-w-md border p-4 rounded shadow bg-white">
//           <h2 className="text-xl font-semibold">Book Appointment</h2>

//           <div>
//             <label className="block text-sm font-medium mb-1">Date</label>
//             <input
//               type="date"
//               value={appointmentDate}
//               onChange={(e) => setAppointmentDate(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Time Slot</label>
//             <select
//               value={timeSlot}
//               onChange={(e) => setTimeSlot(e.target.value)}
//               className="w-full border p-2 rounded"
//               required
//             >
//               <option value="">Choose a time slot</option>
//               <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
//               <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
//               <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
//               <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
//               <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Confirm Booking
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default UserBookAppointment;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchDoctors } from '../../store/doctorsSlice';
// import appointmentService from '../../services/appointmentsService'; // Removed

const UserBookAppointment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const { doctors, loading, error } = useSelector((state: RootState) => state.doctors);

  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [success, setSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchDoctors(token));
    }
  }, [dispatch, token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDoctor || !appointmentDate || !timeSlot) {
      setSubmitError('Please fill all fields');
      return;
    }

    // ✅ Simulate success without backend
    setSuccess('Appointment booked successfully.');
    setAppointmentDate('');
    setTimeSlot('');
    setSelectedDoctor(null);
    setSubmitError('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Doctors</h1>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {submitError && <p className="text-red-600 mb-2">{submitError}</p>}

      {loading && <p>Loading doctors...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && doctors.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded mb-6">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Specialization</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.doctor_id} className="border-b">
                  <td className="px-4 py-2">{doc.first_name} {doc.last_name}</td>
                  <td className="px-4 py-2">{doc.specialization}</td>
                  <td className="px-4 py-2">{doc.email}</td>
                  <td className="px-4 py-2">{doc.contact_phone}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedDoctor(doc.doctor_id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedDoctor && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md border p-4 rounded shadow bg-white">
          <h2 className="text-xl font-semibold">Book Appointment</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Time Slot</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Choose a time slot</option>
              <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
              <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
              <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
              <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
};

export default UserBookAppointment;
