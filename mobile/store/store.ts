import { configureStore } from '@reduxjs/toolkit';
import { Api } from './api';
import { WithTokenApi } from './with_token_api';
import { userSlice } from '../pages/Login/lib/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    [WithTokenApi.reducerPath]: WithTokenApi.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware).concat(WithTokenApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
