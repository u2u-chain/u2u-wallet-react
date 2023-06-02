import {createAsyncThunk} from "@reduxjs/toolkit";
import ApiService from "@/services/ApiService.ts";
import {RootState} from "@/redux/store.ts";

export const doSignIn = createAsyncThunk('auth/sign-in', async (signInData: any, thunkAPI) => {
  const response = await ApiService.login(signInData.email, signInData.password);
  return response.data;
});

export const loadUserProfile = createAsyncThunk('app/load-profile', async () => {
  return await ApiService.getProfile();
})
