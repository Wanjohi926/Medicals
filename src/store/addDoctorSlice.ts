// src/store/addDoctorSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../services/api';

interface AddDoctorData {
  first_name: string;
  last_name: string;
  email: string;
  contact_phone: string;
  specialization: string;
  available_days: string[];
}

interface AddDoctorState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: AddDoctorState = {
  loading: false,
  success: false,
  error: null,
};

// Thunk for submitting doctor form
export const addDoctor = createAsyncThunk<
  any, // Can be more specific if your backend returns something
  AddDoctorData,
  { rejectValue: string }
>('addDoctor/submit', async (doctorData, { rejectWithValue }) => {
  try {
    const response = await api.post('/doctor', doctorData);
    return response.data;
  } catch (error: any) {
    const msg =
      error?.response?.data?.message || 'Failed to add doctor';
    return rejectWithValue(msg);
  }
});

const addDoctorSlice = createSlice({
  name: 'addDoctor',
  initialState,
  reducers: {
    resetAddDoctorState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addDoctor.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addDoctor.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Add doctor failed';
      });
  },
});

export const { resetAddDoctorState } = addDoctorSlice.actions;
export default addDoctorSlice.reducer;
