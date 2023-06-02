import {createSlice} from '@reduxjs/toolkit';
import {doSignIn} from "@/redux/actions/auth.actions.ts";

export interface AuthState {
  isLoggedIn?: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(doSignIn.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
  }});

export const {} = authSlice.actions;

export default authSlice.reducer;
