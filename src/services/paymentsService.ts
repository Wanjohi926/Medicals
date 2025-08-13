import api from './api';
import { Payment } from '../store/paymentSlice';

// Fetch all payments
export const fetchPayments = async (token: string) => {
  const response = await api.get('/payments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

// Post a new payment
export const postPayment = async (
  token: string,
  paymentData: Omit<Payment, 'payment_id' | 'payment_date'>
) => {
  const response = await api.post('/payment', paymentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export default {
  fetchPayments,
  postPayment,
};
