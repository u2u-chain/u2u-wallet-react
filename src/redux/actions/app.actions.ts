import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "@/redux/store.ts";
import hederaService from "@/services/HederaService.ts";

export const loadAccountBalance = createAsyncThunk('app/load-balance', async (arg, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const {networkAccountId} = state.auth;

  const response = await hederaService.getBalance(networkAccountId);

  // hbars in number
  return response.hbars.toBigNumber().toNumber();
});
