import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import doctorsReducer from './doctorsSlice';
import addDoctorReducer from './addDoctorSlice';
import patientsReducer from './patientsSlice';
import paymentsReducer from './paymentSlice';
import appointmentsReducer from './appointmentsSlice';
import complaintsReducer from './complaintsSlice';
import prescriptionsReducer from './prescriptionSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
    addDoctor: addDoctorReducer,
    patients: patientsReducer,
    payments: paymentsReducer,
    appointments: appointmentsReducer,
    complaints: complaintsReducer,
    prescriptions: prescriptionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
