// services/complaintService.ts
import api from './api';

const complaintService = {
  postComplaint: async (
    token: string,
    data: { subject: string; description: string; user_id: number }
  ) => {
    const response = await api.post('/complaint', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  fetchComplaints: async (token: string) => {
    const response = await api.get('/complaints', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  },
};

export default complaintService;
