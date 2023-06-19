import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {doSignInWithPrivateKey, loadUserProfile} from "@/redux/actions/auth.actions.ts";
import {loadAccountBalance, loadPrice} from "@/redux/actions/app.actions.ts";
import {COIN_CODE} from "@/configs/app.config.ts";

export interface AppState {
  appLoading: boolean,
  theme: 'light' | 'dark',
  sidebarOpened: boolean,
  profile?: {
    username: string;
    email: string;
    avatar: string;
  },
  loadingBalance: boolean;
  balance: number;
  currencyLoading: boolean;
  currencyCode: string;
  currencyRate: number;
}

const initialState: AppState = {
  appLoading: true,
  theme: 'light',
  sidebarOpened: false,
  loadingBalance: false,
  balance: 0,
  currencyLoading: false,
  currencyCode: 'usd',
  currencyRate: 1,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSideBarOpened(state, action: PayloadAction<boolean>) {
      state.sidebarOpened = action.payload;
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },
    setCurrency(state, action: PayloadAction<string>) {
      state.currencyCode = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(loadUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(loadAccountBalance.pending, (state) => {
      state.loadingBalance = true;
    }).addCase(loadAccountBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
      state.loadingBalance = false;
    }).addCase(loadPrice.pending, (state) => {
      state.currencyLoading = true;
    }).addCase(loadPrice.fulfilled, (state, action) => {
      if (action.payload[COIN_CODE] && action.payload[COIN_CODE][state.currencyCode])
        state.currencyRate = action.payload[COIN_CODE][state.currencyCode];
      state.currencyLoading = false;
    }).addCase(doSignInWithPrivateKey.fulfilled, (state) => {
      state.profile = {
        username: 'U2U User',
        email: 'anonymous',
        avatar: ''
      }
    });
  }
});

export const {
  setSideBarOpened,
  setTheme,
  setCurrency,
} = appSlice.actions;

export default appSlice.reducer;
