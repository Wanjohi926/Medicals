import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import doctorService from '../services/doctorService';

export interface Doctor {
  doctor_id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_phone: string;
  specialization: string;
  available_days: string[]; 
}

interface DoctorsState {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorsState = {
  doctors: [],
  loading: false,
  error: null,
};

export const fetchDoctors = createAsyncThunk<Doctor[], string, { rejectValue: string }>(
  'doctors/fetchDoctors',
  async (token, { rejectWithValue }) => {
    try {
      return await doctorService.fetchDoctors(token);
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to fetch doctors');
    }
  }
);

export const deleteDoctor = createAsyncThunk<number, { id: number; token: string }, { rejectValue: string }>(
  'doctors/deleteDoctor',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await doctorService.deleteDoctor(id, token);
      return id;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete doctor');
    }
  }
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action: PayloadAction<Doctor[]>) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      })
      .addCase(deleteDoctor.fulfilled, (state, action: PayloadAction<number>) => {
        state.doctors = state.doctors.filter((d) => d.doctor_id !== action.payload);
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.error = action.payload ?? 'Delete error';
      });
  },
});

export default doctorsSlice.reducer;
