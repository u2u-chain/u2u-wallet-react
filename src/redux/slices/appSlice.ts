import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadUserProfile} from "@/redux/actions/auth.actions.ts";
import {loadAccountBalance} from "@/redux/actions/app.actions.ts";

export interface AppState {
  appLoading: boolean,
  theme: 'light' | 'dark',
  sidebarOpened: boolean,
  profile?: {
    fullName: string;
    email: string;
    avatar: string;
  },
  loadingBalance: boolean;
  balance: number;
}

const initialState: AppState = {
  appLoading: true,
  theme: 'light',
  sidebarOpened: false,
  loadingBalance: false,
  balance: 0,
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
    });
  }
});

export const {
  setSideBarOpened,
  setTheme,
} = appSlice.actions;

export default appSlice.reducer;
