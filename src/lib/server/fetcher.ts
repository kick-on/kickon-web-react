import { SERVER_URL, DOMAIN_URL } from '@/services/config/constants';
import useAuthStore from '../store/useAuthStore';
import { getCookie, setCookie, deleteCookie } from '../utils';

export interface FetcherParams {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	url: string;
	headers?: Record<string, string>;
	body?: Record<string, any>;
}

export async function fetcher<T>({ url, method, headers, body }: FetcherParams) {
	// api 호출
	async function performRequest(token?: string) {
		const hasBody = !!body;

		return fetch(`${SERVER_URL}${url}`, {
			method,
			headers: {
				...(token ? { Authorization: `Bearer ${token}` } : {}),
				...(hasBody ? { 'Content-Type': 'application/json' } : {}),
				...headers,
			},
			body: hasBody ? JSON.stringify(body) : undefined,
		});
	}

	// 인증 에러 시 토큰 재발급
	async function refreshAccessToken(): Promise<string | null> {
		try {
			const refreshToken = getCookie('refreshToken');
			if (!refreshToken) return null;

			const response = await fetch(`${SERVER_URL}/auth/refresh`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ refreshToken }),
			});

			if (!response.ok) {
				deleteCookie('refreshToken');
				return null;
			}

			const json = await response.json();
			const { accessToken, refreshToken: newRefreshToken } = json.data;

			if (accessToken) {
				// AccessToken은 보안상 쿠키에 저장하지 않고 Store에만 저장할 수도 있으나,
				// 기존 next 로직이 쿠키를 사용하는 경우에 맞춰 쿠키에도 저장하거나 Store를 업데이트합니다.
				// 여기서는 AuthStore를 업데이트하고 쿠키에도 동기화가 필요한지 확인이 필요합니다.
				// 일단 AuthStore에 저장합니다.
				useAuthStore.getState().setToken(accessToken);

				// Next.js에서는 accessToken 쿠키도 설정했으므로 여기서도 설정해줍니다.
				// (필요 시 useAuthStore.getToken() 등에서 쿠키를 읽어 초기화하도록 되어있음)
				setCookie('accessToken', accessToken, 60 * 60); // 1시간
			}

			if (newRefreshToken) {
				const isLocal = DOMAIN_URL?.includes('localhost');
				// setCookie 유틸리티가 단순하므로 secure 옵션 등은 유틸리티를 수정하거나 직접 설정해야 할 수 있습니다.
				// 일단 기존 setCookie를 사용합니다.
				setCookie('refreshToken', newRefreshToken, 60 * 60 * 24 * 30); // 30일
			}

			return accessToken ?? null;
		} catch {
			return null;
		}
	}

	try {
		// 1차 요청 (현재 보유한 access token 사용)
		const initialToken = useAuthStore.getState().accessToken ?? undefined;
		let response = await performRequest(initialToken);

		if (response.status === 401 || response.status === 403) {
			const newToken = await refreshAccessToken();
			if (newToken) {
				// 2차 요청 (재발급한 access token 사용)
				response = await performRequest(newToken);
			}
		}

		// 에러 핸들링
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ message: response.statusText }));
			const errorMessage = errorData.message || `${response.status} ${response.statusText}`;
			const error = new Error(errorMessage);
			(error as any).statusCode = response.status;
			(error as any).errorData = errorData;
			throw error;
		}

		const contentType = response.headers.get('content-type');
		if (contentType && contentType.includes('application/json')) {
			return (await response.json()) as T;
		} else {
			return {} as T;
		}
	} catch (error) {
		console.error(`${method} ${url} (${error.statusCode}):`, error);
		throw error;
	}
}
