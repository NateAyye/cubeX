import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  sidebarOpen: boolean;
  timerRunning: boolean;
}

const initialState: AppState = {
  sidebarOpen: false,
  timerRunning: false,
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setSidebarState: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTimerState: (state, action: PayloadAction<boolean>) => {
      state.timerRunning = action.payload;
    },
  },
});

export const { setSidebarState, setTimerState } = appStateSlice.actions;
