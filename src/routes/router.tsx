import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTE_PATH } from "./path";
import RootLayout from "@/pages/RootLayout";
import WithSideLayout from "@/pages/WithSideLayout";
import WithoutSideLayout from "@/pages/WithoutSideLayout";
import MobileOnlyLayout from "@/pages/MobileOnlyLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AuthFinalize from "@/pages/AuthFinalize";
import AuthCallback from "@/pages/AuthCallback";
import Withdrawal from "@/pages/Withdrawal";
import ProfileSetting from "@/pages/ProfileSetting";
import Ranking from "@/pages/Ranking";
import Notice from "@/pages/Notice";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{
				element: <WithSideLayout />,
				children: [
					{
						path: ROUTE_PATH.HOME,
						element: <Home />,
					},
					{
						path: ROUTE_PATH.RANKING,
						element: <Ranking />,
					},
				],
			},
			{
				element: <WithoutSideLayout />,
				children: [
					{
						path: ROUTE_PATH.SIGNUP,
						element: <Signup />,
					},
					{
						path: ROUTE_PATH.WITHDRAWAL,
						element: <Withdrawal />,
					},
					{
						path: ROUTE_PATH.PROFILE_SETTING,
						element: <ProfileSetting />,
					},
				],
			},
			{
				element: <MobileOnlyLayout />,
				children: [
					{
						path: ROUTE_PATH.LOGIN,
						element: <Login />,
					},
					{
						path: ROUTE_PATH.NOTICE,
						element: <Notice />,
					},
				],
			},
			{
				path: ROUTE_PATH.AUTH,
				children: [
					{
						path: "callback/:provider",
						element: <AuthCallback />,
					},
					{
						path: "finalize",
						element: <AuthFinalize />,
					},
				],
			},
			{
				path: ROUTE_PATH.NOT_FOUND,
				element: <NotFound />,
			},
			{
				path: "*",
				element: <Navigate to={ROUTE_PATH.NOT_FOUND} replace />,
			},
		],
	},
]);
