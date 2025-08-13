// src/services/doctorAuthService.ts
import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

export const loginDoctor = async (payload: { email: string; password: string }) => {
  const response = await axios.post('/doctor/login', payload);
  return response.data;
};
