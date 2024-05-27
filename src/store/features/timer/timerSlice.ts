import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generateScramble } from "react-rubiks-cube-utils";
import { type CubingEvents } from "~/types";

export interface Timer {
  sidebarOpen: boolean;
  timerRunning: boolean;
  cubingEvent: CubingEvents;
  scramble: string;
}

const DEFAULT_CUBING_EVENT = "3x3";

const initialState: Timer = {
  sidebarOpen: false,
  cubingEvent: DEFAULT_CUBING_EVENT,
  timerRunning: false,
  scramble: generateScramble({ type: DEFAULT_CUBING_EVENT }),
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setSidebarState: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTimerState: (state, action: PayloadAction<boolean>) => {
      state.timerRunning = action.payload;
    },
    setCubingEvent: (state, action: PayloadAction<CubingEvents>) => {
      state.cubingEvent = action.payload;
      state.scramble = generateScramble({ type: action.payload });
    },
    getNewScramble: (state, action: PayloadAction<CubingEvents>) => {
      state.scramble = generateScramble({ type: action.payload });
    },
    setScramble: (state, action: PayloadAction<string>) => {
      state.scramble = action.payload;
    },
  },
});

export const {
  setSidebarState,
  setTimerState,
  setCubingEvent,
  getNewScramble,
  setScramble,
} = timerSlice.actions;
