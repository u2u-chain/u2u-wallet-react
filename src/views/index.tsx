import React, {lazy, Suspense} from "react";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MarketingLayout from "@/components/layouts/marketing/MarketingLayout.tsx";
import AuthLayout from "@/components/layouts/auth/AuthLayout.tsx";
import WalletLayout from "@/components/layouts/wallet/WalletLayout.tsx";
import AuthViews from "@/views/auth-views";
import WalletViews from "@/views/app-views";

const LandingPage = lazy(() => import('@/views/app-views/Landing'));
const WalletPage = lazy(() => import('@/views/app-views/Wallet'));
const TransactionsPage = lazy(() => import('@/views/app-views/Transactions'));

const antIcon = <LoadingOutlined style={{ fontSize: 24}} spin />;

export default function AppViews() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin indicator={antIcon} />}>
        <Routes>
          <Route path="/" element={<MarketingLayout/>}>
            <Route
              path="/"
              index
              element={<Suspense fallback={<Spin indicator={antIcon} />}>
                <LandingPage/>
              </Suspense>}
            />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="*" element={<AuthViews />} />
          </Route>
          <Route path={'/transactions'} element={<WalletLayout/>}>
            <Route
              path=":transactionId/"
              index
              element={<Suspense fallback={<Spin indicator={antIcon} />}>
                <TransactionsPage/>
              </Suspense>}
            />
          </Route>
          <Route path="/wallet" element={<WalletLayout/>}>
            <Route
              index
              element={<Suspense fallback={<Spin indicator={antIcon} />}>
                <WalletPage/>
              </Suspense>}
            />
            <Route path="*" element={<WalletViews />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
