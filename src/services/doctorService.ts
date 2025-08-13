import api from './api';
import { Doctor } from '../store/doctorsSlice';

const doctorService = {
  fetchDoctors: async (token: string): Promise<Doctor[]> => {
    const res = await api.get('/doctors', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const parsedDoctors = res.data.data.map((doc: any) => ({
      ...doc,
      available_days: JSON.parse(
        doc.available_days
          .replace(/{/g, '[')
          .replace(/}/g, ']')
          .replace(/"/g, '"') 
      ),
    }));

    return parsedDoctors;
  },

  deleteDoctor: async (id: number, token: string): Promise<void> => {
    await api.delete(`/doctor/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default doctorService;
