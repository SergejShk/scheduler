import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import SharedLayout from "../common/SharedLayout";

import Public from "../routes/Public";
import Private from "../routes/Private";

const Login = lazy(() => import("../auth/Login"));
const SignUp = lazy(() => import("../auth/SignUp"));
const Calendar = lazy(() => import("../calendar/Calendar"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: <SharedLayout />,
		errorElement: <Navigate to="/" />,
		children: [
			{
				index: true,
				element: <Public component={Login} />,
			},
			{
				path: "sign-up",
				element: <Public component={SignUp} />,
			},
			{
				path: "scheduler",
				element: <Private component={Calendar} />,
			},
		],
	},
]);
