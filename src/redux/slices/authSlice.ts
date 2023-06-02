import {createSlice} from '@reduxjs/toolkit';
import {doSignIn, loadUserProfile} from "@/redux/actions/auth.actions.ts";

export interface AuthState {
  isLoggedIn?: boolean;
  accessToken: string;
  refreshToken: string;
  publicKey: string;
  privateKey: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  publicKey: '',
  privateKey: '',
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
    }).addCase(loadUserProfile.fulfilled, (state, action) => {
      state.privateKey = action.payload.privateKey;
      state.publicKey = action.payload.publicKey;
    });
  }});

export const {} = authSlice.actions;

export default authSlice.reducer;
