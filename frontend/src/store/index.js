import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/TodoSlice.js"; // ✅ fixed: correct import name & extension

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  devTools: import.meta.env.MODE !== "production", // ✅ enable Redux DevTools only in dev mode
});

export default store;
