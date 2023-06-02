import './App.css';
import 'antd/dist/reset.css';
import {ConfigProvider, Layout, theme} from "antd";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "@/views/app-views/Landing";
import MarketingLayout from "@/components/layouts/marketing/MarketingLayout.tsx";
import AuthLayout from "@/components/layouts/auth/AuthLayout.tsx";
import LoginPage from "@/views/auth-views/Login";
import RegisterPage from "@/views/auth-views/Register";

const AppContent = () => {
  return <Layout className={'app-content'}>
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
            index
            element={<RegisterPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Layout>
}

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
          colorLink: '#00b96b'
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <AppContent/>
    </ConfigProvider>
  )
}
