import React, { lazy, Suspense } from 'react';
import {Route, Routes} from 'react-router-dom';
import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

const LoginPage = lazy(() => import('@/views/auth-views/Login'));
const RegisterPage = lazy(() => import('@/views/auth-views/Register'));

const antIcon = <LoadingOutlined style={{ fontSize: 24}} spin />;

export default function AuthViews() {
	return (
		<Suspense fallback={<Spin indicator={antIcon} />}>
			<Routes>
				<Route
					path="login"
					element={<Suspense fallback={<Spin indicator={antIcon} />}>
						<LoginPage/>
					</Suspense>}
				/>
				<Route
					path="register"
					element={<Suspense fallback={<Spin indicator={antIcon} />}>
						<RegisterPage/>
					</Suspense>}
				/>
			</Routes>
		</Suspense>
	)
}

