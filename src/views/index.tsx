import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MarketingLayout from "@/components/layouts/marketing/MarketingLayout.tsx";
import LandingPage from "@/views/app-views/Landing";
import AuthLayout from "@/components/layouts/auth/AuthLayout.tsx";
import LoginPage from "@/views/auth-views/Login";
import RegisterPage from "@/views/auth-views/Register";
import AppLayout from "@/components/layouts/AppLayout.tsx";
import WalletPage from "@/views/app-views/Wallet";
import WalletLayout from "@/components/layouts/wallet/WalletLayout.tsx";
import AssetsPage from "@/views/app-views/Assets";
import HistoryPage from "@/views/app-views/History";

export default function AppViews() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingLayout />}>
          <Route
            path="/"
            index
            element={<LandingPage />}
          />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="login"
            index
            element={<LoginPage />}
          />
          <Route
            path="register"
            element={<RegisterPage />}
          />
        </Route>
        <Route path="/wallet" element={<WalletLayout />}>
          <Route
            path=""
            index
            element={<WalletPage />}
          />
          <Route
            path="assets"
            index
            element={<AssetsPage />}
          />
          <Route
            path="history"
            index
            element={<HistoryPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
