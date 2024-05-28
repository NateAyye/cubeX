import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generateScramble } from "react-rubiks-cube-utils";
import { type solves } from "~/server/db/schema";
import { type CubingEvents } from "~/types";

type CuberStatus = "READY" | "HOLDING" | "STOPPED" | "SOLVING";

export interface Timer {
  sidebarOpen: boolean;
  timerRunning: boolean;
  cubingEvent: CubingEvents;
  scramble: string;
  cuberStatus: CuberStatus;
  scrambleIsLocked: boolean;
  editingScramble: boolean;
  ao5: number;
  sessionSolves: (typeof solves.$inferSelect)[];
}

const DEFAULT_CUBING_EVENT = "3x3";

const initialState: Timer = {
  sidebarOpen: false,
  cubingEvent: DEFAULT_CUBING_EVENT,
  timerRunning: false,
  scramble: generateScramble({ type: DEFAULT_CUBING_EVENT }),
  cuberStatus: "STOPPED",
  scrambleIsLocked: false,
  editingScramble: false,
  ao5: 0,
  sessionSolves: [],
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
    setCuberStatus: (state, action: PayloadAction<CuberStatus>) => {
      state.cuberStatus = action.payload;
    },
    setScrambleIsLocked: (state, action: PayloadAction<boolean>) => {
      state.scrambleIsLocked = action.payload;
    },
    setEditingScramble: (state, action: PayloadAction<boolean>) => {
      state.editingScramble = action.payload;
    },
    setSessionSolves: (
      state,
      action: PayloadAction<(typeof solves.$inferSelect)[]>,
    ) => {
      state.sessionSolves = action.payload;
    },
  },
});

export const {
  setSidebarState,
  setTimerState,
  setCubingEvent,
  getNewScramble,
  setScramble,
  setCuberStatus,
  setScrambleIsLocked,
  setEditingScramble,
  setSessionSolves,
} = timerSlice.actions;
