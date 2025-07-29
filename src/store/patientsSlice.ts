import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { patientService } from '../services/patientsService';

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface PatientsState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: PatientsState = {
  patients: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const fetchPatients = createAsyncThunk<
  Patient[],
  string,
  { rejectValue: string }
>('patients/fetchAll', async (token, { rejectWithValue }) => {
  try {
    return await patientService.fetchAll(token);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch patients');
  }
});

export const updatePatient = createAsyncThunk<
  Patient,
  { id: number; data: Partial<Patient>; token: string },
  { rejectValue: string }
>('patients/update', async ({ id, data, token }, { rejectWithValue }) => {
  try {
    return await patientService.update(id, data, token);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update patient');
  }
});

export const deletePatient = createAsyncThunk<
  number,
  { id: number; token: string },
  { rejectValue: string }
>('patients/delete', async ({ id, token }, { rejectWithValue }) => {
  try {
    return await patientService.delete(id, token);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete patient');
  }
});

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearPatientMessage(state) {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      })

      .addCase(updatePatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.successMessage = 'Patient updated successfully';
        state.patients = state.patients.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to update';
      })

      .addCase(deletePatient.fulfilled, (state, action: PayloadAction<number>) => {
        state.successMessage = 'Patient deleted successfully';
        state.patients = state.patients.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to delete';
      });
  },
});

export const { clearPatientMessage } = patientsSlice.actions;
export default patientsSlice.reducer;
