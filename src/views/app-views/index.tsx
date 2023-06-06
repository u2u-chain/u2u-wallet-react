import React, { lazy, Suspense } from 'react';
import {Route, Routes} from 'react-router-dom';
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";
import AssetsLayout from "@/components/layouts/assets";
import HistoryLayout from "@/components/layouts/history";

const HistoryPage = lazy(() => import('@/views/app-views/History'));
const CollectiblesPage = lazy(() => import('@/views/app-views/Assets/CollectiblesPage'));
const TokensPage = lazy(() => import('@/views/app-views/Assets/TokensPage'));
const SentHistoryPage = lazy(() => import('@/views/app-views/History/SentHistory'));
const ReceivedHistoryPage = lazy(() => import('@/views/app-views/History/ReceivedHistory'));
const TokensHistoryPage = lazy(() => import('@/views/app-views/History/TokensHistory'));
const AccountHistoryPage = lazy(() => import('@/views/app-views/History/AccountHistory'));
const ToolsPage = lazy(() => import('@/views/app-views/Tools'));
const SendPage = lazy(() => import('@/views/app-views/Wallet/Send'));
const AssociateToken = lazy(() => import('@/views/app-views/Tools/AssociateToken'));
const CreateAccount = lazy(() => import('@/views/app-views/Tools/CreateAccount'));
const Download = lazy(() => import('@/views/app-views/Tools/Download'));
const ConvertUnits = lazy(() => import('@/views/app-views/Tools/ConvertUnits'));
const ExportKeystore = lazy(() => import('@/views/app-views/Tools/ExportKeystore'));
const UploadFile = lazy(() => import('@/views/app-views/Tools/Upload'));
const KeysPage = lazy(() => import('@/views/app-views/Keys'));

const antIcon = <LoadingOutlined style={{ fontSize: 24}} spin />;

export default function WalletViews() {
	return (
		<Suspense fallback={<Spin indicator={antIcon} />}>
			<Routes>
				<Route
					path={'send'}
					element={<Suspense fallback={<Spin indicator={antIcon} />}>
						<SendPage/>
					</Suspense>}
				/>
				<Route path={"assets"} element={<AssetsLayout/>}>
					<Route
						path={'tokens'}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<TokensPage/>
						</Suspense>}
					/>
					<Route
						path={'collectibles'}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<CollectiblesPage/>
						</Suspense>}
					/>
				</Route>
				<Route path={'history'} element={<HistoryLayout/>}>
					<Route
						index
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<HistoryPage/>
						</Suspense>}
					/>
					<Route
						path={'sent'}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<SentHistoryPage/>
						</Suspense>}
					/>
					<Route
						path={'received'}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<ReceivedHistoryPage/>
						</Suspense>}
					/>
					<Route
						path={'tokens'}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<TokensHistoryPage/>
						</Suspense>}
					/>
					<Route
						path={'account'}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<AccountHistoryPage/>
						</Suspense>}
					/>
				</Route>
				<Route
					path={'keys'}
					element={<Suspense fallback={<Spin indicator={antIcon} />}>
						<KeysPage />
					</Suspense>}
				/>
				<Route path={"tools"}>
					<Route
						index
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<ToolsPage />
						</Suspense>}
					/>
					<Route
						path={"associate-token"}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<AssociateToken />
						</Suspense>}
					/>
					<Route
						path={"create-account"}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<CreateAccount />
						</Suspense>}
					/>
					<Route
						path={"upload"}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<UploadFile />
						</Suspense>}
					/>
					<Route
						path={"download"}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<Download />
						</Suspense>}
					/>
					<Route
						path={"convert-units"}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<ConvertUnits />
						</Suspense>}
					/>
					<Route
						path={"export-keystore"}
						element={<Suspense fallback={<Spin indicator={antIcon} />}>
							<ExportKeystore />
						</Suspense>}
					/>
				</Route>
			</Routes>
		</Suspense>
	)
}
