import api from './api'; 
import { Doctor } from '../store/doctorsSlice';

const doctorService = {
  fetchDoctors: async (token: string): Promise<Doctor[]> => {
    const res = await api.get('/doctors', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  deleteDoctor: async (id: number, token: string): Promise<void> => {
    await api.delete(`/doctor/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default doctorService;
