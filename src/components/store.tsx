import tasksSlice from "./taskSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

// Infer types for the entire application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
