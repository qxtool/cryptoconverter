import { configureStore } from "@reduxjs/toolkit";
import converter from "./slices/converterSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    converter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
