import { configureStore } from '@reduxjs/toolkit';
import { appStateSlice } from './features/appState/appStateSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      appState: appStateSlice.reducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];