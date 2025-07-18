import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const BASE_URL = 'https://alhayyat-backend.onrender.com';


export const registerUser = createAsyncThunk('registerUser', async (userData, thunkAPI) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    
    const data = await response.json();
    return data;

  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('registerUser', async (userData, thunkAPI) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    const data = await response.json();
    console.log("data" , data)
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const deleteUser = createAsyncThunk('deleteUser', async (id, thunkAPI) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteUser/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    const data = await response.json();
    console.log("data" , data)
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    const response = await fetch(`${BASE_URL}/getallUser`);
  
    if (!response.ok) throw new Error('Failed to fetch users');
  
    const data = await response.json();
   
    return data;
  });


  export const updateUser = createAsyncThunk('updateUser', async ({ values, userId }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/updateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    user:null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; 
    }
  },
  
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
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export const { logout } = counterSlice.actions;

export default counterSlice.reducer;
