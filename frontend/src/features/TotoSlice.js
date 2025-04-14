import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const getAllTodos = createAsyncThunk("todos/getAllTodos", async () => {
  try {
    const result = await axios.get("todo");
    return result.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch todos");
  }
});

export const searchTodos = createAsyncThunk(
  "todos/searchTodos",
  async (query) => {
    try {
      const result = await axios.get(`todo?title_like=${query}`);
      return result.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to search todos");
    }
  }
);

export const insertTodo = createAsyncThunk("todos/insertTodo", async (todo) => {
  try {
    await axios.post("todo", todo);
    return todo; // Returning the inserted todo directly instead of refetching
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add todo");
  }
});

export const removeTodo = createAsyncThunk("todos/removeTodo", async (id) => {
  try {
    await axios.delete(`todo/${id}`);
    return id; // Returning the id to remove it from the store
  } catch (err) {
    console.error(err);
    throw new Error("Failed to remove todo");
  }
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  try {
    await axios.put(`todo/${todo.id}`, todo);
    return todo; // Returning the updated todo
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update todo");
  }
});

// Initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Reducers and extraReducers
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.error = null;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    };

    builder
      // getAllTodos
      .addCase(getAllTodos.pending, handlePending)
      .addCase(getAllTodos.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.data = action.payload;
      })
      .addCase(getAllTodos.rejected, handleRejected)

      // searchTodos
      .addCase(searchTodos.pending, handlePending)
      .addCase(searchTodos.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.data = action.payload;
      })
      .addCase(searchTodos.rejected, handleRejected)

      // insertTodo
      .addCase(insertTodo.pending, handlePending)
      .addCase(insertTodo.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.data.push(action.payload); // Directly push the new todo
      })
      .addCase(insertTodo.rejected, handleRejected)

      // removeTodo
      .addCase(removeTodo.pending, handlePending)
      .addCase(removeTodo.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.data = state.data.filter((todo) => todo.id !== action.payload); // Remove the deleted todo
      })
      .addCase(removeTodo.rejected, handleRejected)

      // updateTodo
      .addCase(updateTodo.pending, handlePending)
      .addCase(updateTodo.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        const index = state.data.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload; // Update the specific todo
        }
      })
      .addCase(updateTodo.rejected, handleRejected);
  },
});

export default todoSlice.reducer;
