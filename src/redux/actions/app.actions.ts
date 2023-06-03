import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "@/redux/store.ts";
import hederaService from "@/services/HederaService.ts";
import axios from "axios";
import {COIN_CODE} from "@/configs/app.config.ts";

export const loadAccountBalance = createAsyncThunk('app/load-balance', async (arg, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const {networkAccountId} = state.auth;

  const response = await hederaService.getBalance(networkAccountId);

  // hbars in number
  return response.hbars.toBigNumber().toNumber();
});


export const loadPrice = createAsyncThunk('app/load-price', async (arg, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const currency = state.app.currencyCode;
  const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
    params: {
      ids: COIN_CODE,
      vs_currencies: currency,
    }
  });
  return response.data;
});
