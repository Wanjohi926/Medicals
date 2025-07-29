import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import appointmentService from '../services/appointmentsService';

export interface Appointment {
  appointment_id: number;
  doctor_id: number;
  user_id: number;
  appointment_date: string;
  time_slot: string;
  appointment_status: string;
  total_amount?: number;
}

interface AppointmentsState {
  appointments: Appointment[];         // for admin
  userAppointments: Appointment[];     // for logged-in user
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentsState = {
  appointments: [],
  userAppointments: [],
  loading: false,
  error: null,
};

// Admin: fetch all
export const fetchAppointments = createAsyncThunk<
  Appointment[],
  string,
  { rejectValue: string }
>('appointments/fetchAll', async (token, thunkAPI) => {
  try {
    return await appointmentService.getAllAppointments(token);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch appointments');
  }
});

// User: fetch by user ID
export const fetchUserAppointments = createAsyncThunk<
  Appointment[],
  { token: string; userId: number },
  { rejectValue: string }
>('appointments/fetchUser', async ({ token, userId }, thunkAPI) => {
  try {
    return await appointmentService.getUserAppointments(token, userId);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch user appointments');
  }
});

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Admin
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      })

      // User
      .addCase(fetchUserAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.loading = false;
        state.userAppointments = action.payload;
      })
      .addCase(fetchUserAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default appointmentsSlice.reducer;
