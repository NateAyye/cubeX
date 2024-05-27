import { configureStore } from "@reduxjs/toolkit";
import { timerSlice } from "./features/timer/timerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      timer: timerSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
