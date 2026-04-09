import { useEffect, useState } from 'react';
import useAuthStore from '@/lib/store/useAuthStore';
import { loginWithDevice } from '@/services/apis/user/user.api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrentUserInfoStore } from '@/lib/store/useCurrentUserInfoStore';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
	const { accessToken, getToken, setToken } = useAuthStore();
	const { currentUserInfo, fetchUserInfo } = useCurrentUserInfoStore();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const initializeAuth = async () => {
			const currentToken = getToken ? getToken() : accessToken;

			if (currentToken) {
				// 🔥 [핵심] 토큰은 있는데 유저 정보가 없으면 가져온다!
				if (!currentUserInfo) {
					try {
						await fetchUserInfo();
					} catch (e) {
						console.error('유저 정보 로드 실패');
					}
				}
				setIsLoading(false);
				return;
			}

			// 1. 이미 로그인 상태라면 로직 종료
			if (accessToken) {
				setIsLoading(false);
				return;
			}

			// 2. 현재 페이지가 회원가입 페이지라면 체크 중단 (무한 루프 방지)
			if (location.pathname === '/signup') {
				setIsLoading(false);
				return;
			}

			const deviceCredential = localStorage.getItem('device_credential');
			const savedNickname = localStorage.getItem('nickname');

			// 3. 정보가 없거나 자동 로그인에 실패할 경우의 통합 처리 함수
			const redirectToSignup = () => {
				alert('회원가입 후 이용해 주세요!');
				navigate('/signup', { replace: true });
			};

			// 기기 정보나 닉네임이 로컬에 없다면 가입 안 한 유저
			if (!deviceCredential || !savedNickname) {
				setIsLoading(false);
				redirectToSignup();
				return;
			}

			try {
				// 디바이스 자동 로그인 api 호출
				const response = await loginWithDevice({
					nickname: savedNickname,
					deviceCredential: deviceCredential,
				});

				if (response.data.token.accessToken) {
					setToken(response.data.token.accessToken);
					console.log('자동 로그인 성공');
				}
			} catch (error) {
				console.error('자동 로그인 실패:', error);
			} finally {
				setIsLoading(false);
			}
		};

		initializeAuth();
	}, [accessToken, setToken]);

	if (isLoading) return null;

	return <>{children}</>;
}
