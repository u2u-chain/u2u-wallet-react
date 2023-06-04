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
import ToolsPage from "@/views/app-views/Tools";
import SendPage from "@/views/app-views/Wallet/Send";
import AssociateToken from "@/views/app-views/Tools/AssociateToken";
import CreateAccount from "@/views/app-views/Tools/CreateAccount";
import Download from "@/views/app-views/Tools/Download";
import ConvertUnits from "@/views/app-views/Tools/ConvertUnits";
import ExportKeystore from "@/views/app-views/Tools/ExportKeystore";
import UploadFile from "@/views/app-views/Tools/Upload";
import TransactionsPage from "@/views/app-views/Transactions";

export default function AppViews() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingLayout/>}>
          <Route
            path="/"
            index
            element={<LandingPage/>}
          />
        </Route>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route
            path="login"
            index
            element={<LoginPage/>}
          />
          <Route
            path="register"
            element={<RegisterPage/>}
          />
        </Route>
        <Route path={'/transactions'} element={<WalletLayout/>}>
          <Route
            path=":transactionId/"
            index
            element={<TransactionsPage/>}
          />
        </Route>
        <Route path="/wallet" element={<WalletLayout/>}>
          <Route
            path=""
            index
            element={<WalletPage/>}
          />
          <Route
            path={'send'}
            element={<SendPage/>}
          />
          <Route path={"assets"} element={<AssetsLayout/>}>
            <Route
              path={'tokens'}
              element={<TokensPage/>}
            />
            <Route
              path={'collectibles'}
              element={<CollectiblesPage/>}
            />
          </Route>
          <Route path={'history'} element={<HistoryLayout/>}>
            <Route
              index
              element={<HistoryPage/>}
            />
            <Route
              path={'sent'}
              element={<SentHistoryPage/>}
            />
            <Route
              path={'received'}
              element={<ReceivedHistoryPage/>}
            />
            <Route
              path={'tokens'}
              element={<TokensHistoryPage/>}
            />
            <Route
              path={'account'}
              element={<AccountHistoryPage/>}
            />
          </Route>
          <Route path={"tools"}>
            <Route
              index
              element={<ToolsPage />}
            />
            <Route
              path={"associate-token"}
              element={<AssociateToken />}
            />
            <Route
              path={"create-account"}
              element={<CreateAccount />}
            />
            <Route
              path={"upload"}
              element={<UploadFile />}
            />
            <Route
              path={"download"}
              element={<Download />}
            />
            <Route
              path={"convert-units"}
              element={<ConvertUnits />}
            />
            <Route
              path={"export-keystore"}
              element={<ExportKeystore />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
