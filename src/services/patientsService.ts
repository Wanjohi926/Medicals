import api from './api';

export const patientService = {
  fetchAll: async (token: string) => {
    const res = await api.get('/users', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const normalized = res.data.data.map((user: any) => ({
      id: user.user_id, 
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }));

    return normalized;
  },

  update: async (id: number, data: any, token: string) => {
    const res = await api.put(`/user/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  },

  delete: async (id: number, token: string) => {
    await api.delete(`/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  },
};
