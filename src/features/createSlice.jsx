import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:5000';

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    const response = await fetch(`${BASE_URL}/getallUser`);
  
    if (!response.ok) throw new Error('Failed to fetch users');
  
    const data = await response.json();
   
    return data;
  });
  

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default counterSlice.reducer;
