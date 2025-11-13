import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 🔧 Setup Axios base URL (optional, improves maintainability)
axios.defaults.baseURL = "http://localhost:3000/"; // Ganti sesuai API kamu

// 🔄 Async Thunks
export const getAllTodos = createAsyncThunk("todos/getAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("todo");
    return data;
  } catch (error) {
    console.error("❌ Fetch error:", error);
    return rejectWithValue(error.response?.data?.message || "Failed to fetch todos");
  }
});

export const searchTodos = createAsyncThunk("todos/search", async (query, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`todo?title_like=${query}`);
    return data;
  } catch (error) {
    console.error("❌ Search error:", error);
    return rejectWithValue(error.response?.data?.message || "Failed to search todos");
  }
});

export const insertTodo = createAsyncThunk("todos/insert", async (todo, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("todo", todo);
    return data;
  } catch (error) {
    console.error("❌ Insert error:", error);
    return rejectWithValue(error.response?.data?.message || "Failed to add todo");
  }
});

export const removeTodo = createAsyncThunk("todos/remove", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`todo/${id}`);
    return id;
  } catch (error) {
    console.error("❌ Remove error:", error);
    return rejectWithValue(error.response?.data?.message || "Failed to remove todo");
  }
});

export const updateTodo = createAsyncThunk("todos/update", async (todo, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`todo/${todo.id}`, todo);
    return data;
  } catch (error) {
    console.error("❌ Update error:", error);
    return rejectWithValue(error.response?.data?.message || "Failed to update todo");
  }
});

// 🧱 Initial State
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// 🧩 Slice Definition
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    const pending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const fulfilled = (state) => {
      state.loading = false;
      state.error = null;
    };

    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    };

    builder
      // 📦 Get All
      .addCase(getAllTodos.pending, pending)
      .addCase(getAllTodos.fulfilled, (state, action) => {
        fulfilled(state);
        state.data = action.payload;
      })
      .addCase(getAllTodos.rejected, rejected)

      // 🔍 Search
      .addCase(searchTodos.pending, pending)
      .addCase(searchTodos.fulfilled, (state, action) => {
        fulfilled(state);
        state.data = action.payload;
      })
      .addCase(searchTodos.rejected, rejected)

      // ➕ Insert
      .addCase(insertTodo.pending, pending)
      .addCase(insertTodo.fulfilled, (state, action) => {
        fulfilled(state);
        state.data.push(action.payload);
      })
      .addCase(insertTodo.rejected, rejected)

      // ❌ Remove
      .addCase(removeTodo.pending, pending)
      .addCase(removeTodo.fulfilled, (state, action) => {
        fulfilled(state);
        state.data = state.data.filter((todo) => todo.id !== action.payload);
      })
      .addCase(removeTodo.rejected, rejected)

      // 🔄 Update
      .addCase(updateTodo.pending, pending)
      .addCase(updateTodo.fulfilled, (state, action) => {
        fulfilled(state);
        const index = state.data.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(updateTodo.rejected, rejected);
  },
});

export default todoSlice.reducer;
