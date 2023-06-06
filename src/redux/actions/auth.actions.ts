import {createAsyncThunk} from "@reduxjs/toolkit";
import ApiService from "@/services/ApiService.ts";
import HederaService from "@/services/HederaService.ts";
import {PrivateKey} from "@hashgraph/sdk";

export const doSignIn = createAsyncThunk('auth/sign-in', async (signInData: any) => {
  const response = await ApiService.login(signInData.email, signInData.password);
  return response.data;
});

export const doSignInWithPrivateKey = createAsyncThunk('auth/sign-in-private-key', async (signInData: any) => {
  HederaService.initialize(signInData.accountId, signInData.privateKey);
  await HederaService.getBalance(signInData.accountId);

  const privateKey = PrivateKey.fromString(signInData.privateKey);
  const publicKey = privateKey.publicKey.toStringDer();
  return {
    ...signInData,
    publicKey
  };
})

export const loadUserProfile = createAsyncThunk('app/load-profile', async () => {
  return await ApiService.getProfile();
})

export const doSignOut = createAsyncThunk('auth/sign-out', async () => {
  localStorage.clear();
  location.reload();
  return;
});
