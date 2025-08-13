// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../../store/store';
// import complaintService from '../../services/complaintsService';

// type Complaint = {
//   complaint_id: number;
//   subject: string;
//   description: string;
//   status: string;
//   created_at: string;
// };

// const UserComplaints = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const token = useSelector((state: RootState) => state.auth.token);

//   const [complaints, setComplaints] = useState<Complaint[]>([]);
//   const [subject, setSubject] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const fetchUserComplaints = async () => {
//     try {
//       setLoading(true);
//       const data = await complaintService.fetchComplaints(token!);
//       setComplaints(data);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to load complaints');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!subject || !description) return;

//     try {
//       setLoading(true);
//       await complaintService.postComplaint(token!, { user_id: subject, description });
//       setSuccess('Complaint submitted successfully.');
//       setSubject('');
//       setDescription('');
//       fetchUserComplaints(); 
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to submit complaint');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchUserComplaints();
//     }
//   }, [token]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Complaints</h1>

//       {success && <p className="text-green-600 mb-2">{success}</p>}
//       {error && <p className="text-red-600 mb-2">{error}</p>}

//       <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
//         <div>
//           <label className="block text-sm font-medium">Subject</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Description</label>
//           <textarea
//             className="w-full border p-2 rounded"
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           Submit Complaint
//         </button>
//       </form>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="px-4 py-2 border-b">#</th>
//               <th className="px-4 py-2 border-b">Subject</th>
//               <th className="px-4 py-2 border-b">Description</th>
//               <th className="px-4 py-2 border-b">Status</th>
//               <th className="px-4 py-2 border-b">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {complaints.map((complaint, index) => (
//               <tr key={complaint.complaint_id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b">{index + 1}</td>
//                 <td className="px-4 py-2 border-b">{complaint.subject}</td>
//                 <td className="px-4 py-2 border-b max-w-sm truncate">
//                   {complaint.description}
//                 </td>
//                 <td className="px-4 py-2 border-b">{complaint.status}</td>
//                 <td className="px-4 py-2 border-b">
//                   {new Date(complaint.created_at).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserComplaints;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import complaintService from '../../services/complaintsService';

type Complaint = {
  complaint_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
};

const UserComplaints = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUserComplaints = async () => {
    try {
      setLoading(true);
      const data = await complaintService.fetchComplaints(token!);
      setComplaints(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    try {
      setLoading(true);

      const newComplaint: Complaint = {
        complaint_id: complaints.length + 1,
        subject,
        description,
        status: 'Pending',
        created_at: new Date().toISOString(),
      };

      setComplaints([newComplaint, ...complaints]); // insert at top
      setSuccess('Complaint submitted successfully.');
      setSubject('');
      setDescription('');
      setError('');
    } catch {
      setError('Failed to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserComplaints();
    }
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Complaints</h1>

      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium">Subject</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Submit Complaint
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Subject</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={complaint.complaint_id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{complaint.subject}</td>
                <td className="px-4 py-2 border-b max-w-sm truncate">
                  {complaint.description}
                </td>
                <td className="px-4 py-2 border-b">{complaint.status}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(complaint.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserComplaints;
