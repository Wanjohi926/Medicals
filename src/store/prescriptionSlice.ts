import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import prescriptionService from '../services/prescriptionsService';

export interface Prescription {
  prescription_id: number;
  appointment_id: number;
  doctor_id: number;
  user_id: number;
  notes: string;
  created_at: string;
  doctor?: {
    first_name: string;
    last_name: string;
  };
  appointment?: {
    appointment_date: string;
    time_slot: string;
  };
}

interface State {
  prescriptions: Prescription[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  prescriptions: [],
  loading: false,
  error: null,
};

export const fetchUserPrescriptions = createAsyncThunk<
  Prescription[],
  { token: string; user_Id: number },
  { rejectValue: string }
>('prescriptions/fetchUser', async ({ token, user_Id }, thunkAPI) => {
  try {
    return await prescriptionService.getUserPrescriptions(token, user_Id);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch prescriptions');
  }
});

const prescriptionsSlice = createSlice({
  name: 'prescriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPrescriptions.fulfilled, (state, action: PayloadAction<Prescription[]>) => {
        state.loading = false;
        state.prescriptions = action.payload;
      })
      .addCase(fetchUserPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default prescriptionsSlice.reducer;
