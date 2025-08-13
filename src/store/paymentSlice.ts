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

// Fetch all payments
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

// Create a new payment
export const createPayment = createAsyncThunk<
  Payment,
  { token: string; data: Omit<Payment, 'payment_id' | 'payment_date'> },
  { rejectValue: string }
>('payments/create', async ({ token, data }, { rejectWithValue }) => {
  try {
    return await paymentService.postPayment(token, data);
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to submit payment');
  }
});

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
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
      })

      // Create new
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action: PayloadAction<Payment>) => {
        state.loading = false;
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default paymentSlice.reducer;
