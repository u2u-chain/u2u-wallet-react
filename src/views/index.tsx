import {BrowserRouter, Route, Routes} from "react-router-dom";
import MarketingLayout from "@/components/layouts/marketing/MarketingLayout.tsx";
import LandingPage from "@/views/app-views/Landing";
import AuthLayout from "@/components/layouts/auth/AuthLayout.tsx";
import LoginPage from "@/views/auth-views/Login";
import RegisterPage from "@/views/auth-views/Register";
import WalletPage from "@/views/app-views/Wallet";
import WalletLayout from "@/components/layouts/wallet/WalletLayout.tsx";
import HistoryPage from "@/views/app-views/History";
import AssetsLayout from "@/components/layouts/assets";
import CollectiblesPage from "@/views/app-views/Assets/CollectiblesPage";
import TokensPage from "@/views/app-views/Assets/TokensPage";
import HistoryLayout from "@/components/layouts/history";
import SentHistoryPage from "@/views/app-views/History/SentHistory";
import ReceivedHistoryPage from "@/views/app-views/History/ReceivedHistory";
import TokensHistoryPage from "@/views/app-views/History/TokensHistory";
import AccountHistoryPage from "@/views/app-views/History/AccountHistory";

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
          <Route path={"assets"} element={<AssetsLayout />}>
            <Route
              path={'tokens'}
              element={<TokensPage />}
            />
            <Route
              path={'collectibles'}
              element={<CollectiblesPage />}
            />
          </Route>
          <Route path={'history'} element={<HistoryLayout />} >
            <Route
              index
              element={<HistoryPage />}
            />
            <Route
              path={'sent'}
              element={<SentHistoryPage />}
            />
            <Route
              path={'received'}
              element={<ReceivedHistoryPage />}
            />
            <Route
              path={'tokens'}
              element={<TokensHistoryPage />}
            />
            <Route
              path={'account'}
              element={<AccountHistoryPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
