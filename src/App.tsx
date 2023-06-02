import './App.css';
import 'antd/dist/reset.css';
import {ConfigProvider, Layout, theme} from "antd";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "@/views/app-views/Landing";
import MarketingLayout from "@/components/layouts/marketing/MarketingLayout.tsx";

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
        },
        algorithm: theme.darkAlgorithm
      }}
    >
      <AppContent/>
    </ConfigProvider>
  )
}
