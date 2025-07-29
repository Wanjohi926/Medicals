// src/types.ts

// Basic Doctor interface
export interface Doctor {
  doctor_id: number;
  full_name: string;
  specialization: string;
  email: string;
  phone: string;
}

export interface DoctorState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}
