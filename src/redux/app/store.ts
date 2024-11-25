import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import { globalApi } from "../features/api/globalApi";

export const store = configureStore({
  reducer: {
    [globalApi.reducerPath]: globalApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares({ serializableCheck: false }).concat(globalApi.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
