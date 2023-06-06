import {createSlice} from '@reduxjs/toolkit';
import {doSignIn, doSignInWithPrivateKey, loadUserProfile} from "@/redux/actions/auth.actions.ts";

export interface AuthState {
  isLoggedIn?: boolean;
  accessToken: string;
  refreshToken: string;
  publicKey: string;
  privateKey: string;
  networkAccountId: string;
  authMethod?: 'account' | 'privateKey';
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  publicKey: '',
  privateKey: '',
  networkAccountId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(doSignIn.fulfilled, (state, action) => {
      state.authMethod = 'account';
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    }).addCase(doSignInWithPrivateKey.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.authMethod = 'privateKey';
      state.privateKey = action.payload.privateKey;
      state.publicKey = action.payload.publicKey;
      state.networkAccountId = action.payload.accountId;
    }).addCase(loadUserProfile.fulfilled, (state, action) => {
      state.privateKey = action.payload.privateKey;
      state.publicKey = action.payload.publicKey;
      state.networkAccountId = action.payload.networkAccountId;
    });
  }});

export const {} = authSlice.actions;

export default authSlice.reducer;
