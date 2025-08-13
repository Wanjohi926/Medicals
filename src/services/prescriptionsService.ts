import api from './api';

const prescriptionService = {
  getUserPrescriptions: async (token: string, userId: number) => {
    const res = await api.get(`/prescriptions/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  }
};

export default prescriptionService;
