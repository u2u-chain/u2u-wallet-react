import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadUserProfile} from "@/redux/actions/auth.actions.ts";

export interface AppState {
  appLoading: boolean,
  theme: 'light' | 'dark',
  sidebarOpened: boolean,
  profile?: {
    fullName: string;
    email: string;
    avatar: string;
  }
}

const initialState: AppState = {
  appLoading: true,
  theme: 'light',
  sidebarOpened: false,
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
  }
});

export const {
  setSideBarOpened,
  setTheme,
} = appSlice.actions;

export default appSlice.reducer;
