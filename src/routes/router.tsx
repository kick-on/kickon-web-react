import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATH } from "./path";

export const router = createBrowserRouter([
	{
		path: ROUTE_PATH.HOME,
		element: <></>,
	},
	{
		path: ROUTE_PATH.LOGIN,
		element: <></>,
	},
	{
		path: ROUTE_PATH.SIGNUP,
		element: <></>,
	},
	{
		path: ROUTE_PATH.AUTH,
		element: <></>,
	},
	{
		path: ROUTE_PATH.WITHDRAWAL,
		element: <></>,
	},
	{
		path: ROUTE_PATH.PROFILE_SETTING,
		element: <></>,
	},
	{
		path: ROUTE_PATH.RANKING,
		element: <></>,
	},
	{
		path: ROUTE_PATH.NOTICE,
		element: <></>,
	},
	{
		path: ROUTE_PATH.NOT_FOUND,
		element: <></>,
	},
]);