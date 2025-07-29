import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import paymentService from '../services/paymentsService';

export interface Payment {
  payment_id: number;
  appointment_id: number;
  amount: number;
  transaction_id: string;
  payment_status: string;
  payment_date: string;
}

interface PaymentState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  loading: false,
  error: null,
};

export const fetchAllPayments = createAsyncThunk<
  Payment[],
  string,
  { rejectValue: string }
>('payments/fetchAll', async (token, { rejectWithValue }) => {
  try {
    return await paymentService.fetchPayments(token);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch payments');
  }
});

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPayments.fulfilled, (state, action: PayloadAction<Payment[]>) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default paymentSlice.reducer;
