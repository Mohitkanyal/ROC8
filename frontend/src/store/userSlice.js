import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SummaryApi from '../common';

export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails', async () => {
  const response = await fetch(SummaryApi.current_user.url, {
    method: SummaryApi.current_user.method,
    credentials: 'include',
  });
  const data = await response.json();
  if (data.success) {
    return data.data;
  }
  throw new Error('Failed to fetch user details');
});

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
