import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Doctor } from '../services/types';
import { getDoctorById, UpdateDoctor } from '../services/updateDoctorService';

export interface DoctorState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: DoctorState = {
  doctors: [],
  selectedDoctor: null,
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchById',
  async (id: number, thunkAPI) => {
    try {
      return await getDoctorById(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Fetch failed');
    }
  }
);

export const updateDoctorThunk = createAsyncThunk(
  'doctors/updateDoctor',
  async (
    { id, data }: { id: number; data: Partial<Doctor> },
    thunkAPI
  ) => {
    try {
      return await UpdateDoctor(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    clearDoctorMessage: (state) => {
      state.error = null;
      state.successMessage = null;
      state.selectedDoctor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDoctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateDoctorThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = 'Doctor updated successfully';
        state.selectedDoctor = action.payload;
        state.doctors = state.doctors.map((doc) =>
          doc.doctor_id === action.payload.doctor_id ? action.payload : doc
        );
      })
      .addCase(updateDoctorThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDoctorMessage } = doctorSlice.actions;
export default doctorSlice.reducer;
