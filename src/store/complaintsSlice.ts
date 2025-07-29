import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import complaintService from '../services/complaintsService'
export const fetchAllComplaints = createAsyncThunk(
  'complaints/fetchAll',
  async (token: string, thunkAPI) => {
    try {
      return await complaintService.fetchComplaints(token);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch complaints'
      );
    }
  }
);

const complaintsSlice = createSlice({
  name: 'complaints',
  initialState: {
    complaints: [],
    loading: false,
    error: null,
  } as {
    complaints: any[];
    loading: boolean;
    error: string | null;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload;
      })
      .addCase(fetchAllComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default complaintsSlice.reducer;
