// src/services/appointmentsService.ts

import api from './api';

const appointmentService = {
  getAllAppointments: async (token: string) => {
    const response = await api.get('/appointments', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  getUserAppointments: async (token: string, userId: number) => {
    const response = await api.get(`/appointments/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  },

  bookAppointment: async (
    token: string,
    data: {
      doctor_id: number;
      user_id: number;
      appointment_date: string;
      time_slot: string;
      appointment_status: string;
    }
  ) => {
    const response = await api.post('/appointment', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default appointmentService;
