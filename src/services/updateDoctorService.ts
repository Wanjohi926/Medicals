import axios from 'axios';
import { Doctor } from '../services/types';

const API_URL = '/api/doctors';

export const getDoctorById = async (id: number): Promise<Doctor> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const UpdateDoctor = async (id: number, doctorData: Partial<Doctor>): Promise<Doctor> => {
  const res = await axios.put(`${API_URL}/${id}`, doctorData);
  return res.data;
};
