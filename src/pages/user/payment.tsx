import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { createPayment } from '../../store/paymentSlice';
import { Loader2 } from 'lucide-react';

const SubmitPayment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const loading = useSelector((state: RootState) => state.payments.loading);
  const error = useSelector((state: RootState) => state.payments.error);

  const [formData, setFormData] = useState({
    appointment_id: '',
    amount: '',
    transaction_id: '',
    payment_status: 'Completed',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      appointment_id: Number(formData.appointment_id),
      amount: Number(formData.amount),
      transaction_id: formData.transaction_id,
      payment_status: formData.payment_status,
    };

    if (!token) return alert('You must be logged in');

    dispatch(createPayment({ token, data: payload }));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Submit Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          name="appointment_id"
          placeholder="Appointment ID"
          value={formData.appointment_id}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500 text-sm">KES</span>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border pl-12 pr-4 py-2 rounded"
            required
          />
        </div>

        <input
          type="text"
          name="transaction_id"
          placeholder="Transaction ID"
          value={formData.transaction_id}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <select
          name="payment_status"
          value={formData.payment_status}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Submitting...' : 'Submit Payment'}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default SubmitPayment;
