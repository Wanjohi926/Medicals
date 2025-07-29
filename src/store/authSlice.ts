import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '../services/authService';

interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const authData = authService.getCurrentUser();

const initialState: AuthState = {
  user: authData?.user || null,
  token: authData?.token || null,
  isAuthenticated: !!authData?.token,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  { token: string; user: User },
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return await authService.login(credentials);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Login failed');
  }
});


export const registerPatient = createAsyncThunk<
  { token: string; user: User },
  { first_name: string; last_name: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async (userData, { rejectWithValue }) => {
  try {
    return await authService.register(userData);
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Registration failed');
  }
});

export const verifyUser = createAsyncThunk<
  string,
  { email: string; code: string },
  { rejectValue: string } 
>('auth/verifyUser', async (data, { rejectWithValue }) => {
  try {
    const response = await authService.verify(data);
    return response.message;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || 'Verification failed');
  }
});


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Login failed';
      })

      .addCase(registerPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerPatient.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Registration failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
