import api from './api';

export const fetchPayments = async (token: string) => {
  const response = await api.get('/payments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export default { fetchPayments };
