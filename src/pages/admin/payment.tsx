import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPayments } from '../../store/paymentSlice';
import { RootState, AppDispatch } from '../../store/store';

const Payments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, loading, error } = useSelector((state: RootState) => state.payments);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchAllPayments(token));
    }
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payments</h2>

      {loading && <p>Loading payments...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && payments.length > 0 && (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Payment ID</th>
                <th className="px-4 py-2 text-left">Appointment ID</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Transaction ID</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.payment_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{payment.payment_id}</td>
                  <td className="px-4 py-2">{payment.appointment_id}</td>
                  <td className="px-4 py-2">Ksh {payment.amount}</td>
                  <td className="px-4 py-2">{payment.payment_status}</td>
                  <td className="px-4 py-2">{payment.transaction_id}</td>
                  <td className="px-4 py-2">{new Date(payment.payment_date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && payments.length === 0 && <p>No payments found.</p>}
    </div>
  );
};

export default Payments;
