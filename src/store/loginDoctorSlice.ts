// src/store/doctorAuthSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginDoctor } from '../services/doctorService';

interface DoctorAuthState {
  doctor: { doctor_id: number; email: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: DoctorAuthState = {
  doctor: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Thunk
export const loginDoctorThunk = createAsyncThunk(
  'doctorAuth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginDoctor(credentials);
      return data; // { token, doctor }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

const doctorAuthSlice = createSlice({
  name: 'doctorAuth',
  initialState,
  reducers: {
    logoutDoctor(state) {
      state.doctor = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearDoctorError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginDoctorThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginDoctorThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.doctor = action.payload.doctor;
        state.isAuthenticated = true;
      })
      .addCase(loginDoctorThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.token = null;
        state.doctor = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logoutDoctor, clearDoctorError } = doctorAuthSlice.actions;
export default doctorAuthSlice.reducer;
