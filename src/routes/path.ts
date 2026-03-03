export const ROUTE_PATH = {
	HOME: "/",
	LOGIN: "/login",
	SIGNUP: "/signup",
	AUTH: '/auth',
	WITHDRAWAL: "/withdrawal",
	PROFILE_SETTING: "/profile-setting",
	RANKING: "/ranking",
	NOTICE: "/notice",
	NOT_FOUND: "/404",
} as const;

export type Routes = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];